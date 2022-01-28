import { nanoid } from 'nanoid'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addTodo, ITodo, updateTodo } from '../../app/slice/todosSlice'
import { addTomato, finishTomato, updateTomato } from '../../app/slice/tomatoSlice';
import TodoItem from './TodoItem';
import './Todos.css'

export default function Todos() {
    const { todos } = useAppSelector(state => state.todos);
    const { finish } = useAppSelector(state => state.tomato);
    const dispatch = useAppDispatch();

    //当前任务数（未开始）
    const total = todos.reduce((pre, todo) => pre + (!todo.start ? 1 : 0), 0);
    //选中的任务数
    const checkedCount = todos.reduce((pre, todo) => pre + (todo.checked && !todo.start ? 1 : 0), 0);

    //键盘事件的回调，用于添加任务
    const handleKeyUp = (event: { keyCode: number; target: any; }) => {
        //解构赋值获取keyCode,target
        const { keyCode, target } = event;
        //判断是否是回车按键
        if (keyCode !== 13) return;
        //添加的todo名字不能为空
        if (target.value.trim() === '') {
            alert('输入不能为空');
            return;
        }
        //准备好一个todo对象
        const todoObj: ITodo = {
            id: nanoid(),
            task: target.value,
            checked: false,
            start: false,
            done: false
        };
        //将todoObj传递给actionCreater
        dispatch(addTodo(todoObj));
        //清空输入
        target.value = '';
    }

    //用于全选任务
    const handleCheckAll = (event: { target: { checked: boolean; }; }) => {
        todos.forEach(todoObj => dispatch(updateTodo({ ...todoObj, checked: event.target.checked })));
    }

    //用于倒计时
    const countDown = (total: number, start: ITodo[]) => {
        let count = total; //任务总时间(秒)
        let startTime = new Date().getTime(); //任务开始时间(ms)
        let speed = 100;
        let diff = 0; //时间误差(ms)
        let i = 0; //任务的索引值
        let id = setInterval(() => {
            count--;       
            dispatch(updateTomato(count));
            let current = total - count;
            if (i < start.length && current === (1800 * i + 1500)) {
                dispatch(updateTodo({ ...start[i], start: true, done: true }));
                alert(`完成任务【${start[i].task}】，${i === (start.length - 1) ? '恭喜你完成所有任务!' : '休息5分钟吧!'}`);
                i++;
            }
            if (i < start.length && current === 1800 * i) {
                alert('休息结束，开始下一个任务吧!');
            }
            if (count === 0) {
                dispatch(finishTomato());
                // alert(`完成任务【${start[start.length - 1].task}】恭喜你完成所有任务!`);
                clearInterval(id);
            }
            //真实时间ms
            let realTime = new Date().getTime() - startTime;
            //计算误差
            diff = realTime - current * speed;
        }, (speed - diff)); //修正时间
    };

    //用于开始番茄任务
    const handleStart = () => {
        //开始的任务
        const startTodos = todos.filter(todo => !todo.start && todo.checked);
        if (!startTodos.length) {
            alert('请选择要开始的任务!');
            return;
        } else if (startTodos.length > 48) {
            alert('最多可选择48个任务!');
            return;
        }
        //更新todos
        startTodos.forEach(todoObj => dispatch(updateTodo({ ...todoObj, start: true })));
        //倒计时的时间(秒)
        let totalTime = (startTodos.length * 30 - 5) * 60;
        //开始番茄
        dispatch(addTomato(totalTime));
        //开始计时
        countDown(totalTime, startTodos);//倒计时
    };

    return (
        <div className="todo-container">
            <div className="todo-wrap">
                <div className="todo-header">
                    <input onKeyUp={handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
                </div>
                <ul className="todo-main">
                    {
                        total ?
                            todos.map(todoObj => {
                                return todoObj.start ? null : <TodoItem key={todoObj.id} {...todoObj} />
                            }) :
                            (<div className='empty'>当前任务列表为空，请添加任务!</div>)
                    }
                </ul>
                <div className="todo-footer">
                    <label>
                        <input type="checkbox" onChange={handleCheckAll} checked={checkedCount === total && total !== 0 ? true : false} />
                    </label>
                    <span>
                        选中任务{checkedCount}/当前任务{total}
                    </span>
                    <button
                        onClick={handleStart}
                        className={finish ? "btn btn-start" : "btn btn-working"}
                        disabled={!finish}
                    >开始任务</button>
                </div>
            </div>
        </div>
    )
}
