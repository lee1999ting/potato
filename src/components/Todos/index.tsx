import { nanoid } from 'nanoid'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addTodo, ITodo, updateTodo } from '../../app/todosSlice'
import { addTomato, finishTomato, updateTomato} from '../../app/tomatoSlice';
import TodoItem from './TodoItem';
import './Todos.css'

export default function Todos() {
    const { todos } = useAppSelector(state => state.todos);
    const { finish } = useAppSelector(state => state.tomato);
    const dispatch = useAppDispatch();
    
    //当前任务（未开始）
    const currentTodos = todos.filter(todo => !todo.start);
    //当前任务数
    const total = currentTodos.length;
    //选中的任务数
    const checkedCount = currentTodos.reduce((pre,todo)=> pre + (todo.checked && !todo.start ? 1 : 0),0);

    //键盘事件的回调，用于添加任务
	const handleKeyUp = (event: { keyCode: number; target: any; }) => {
		//解构赋值获取keyCode,target
		const {keyCode,target} = event
		//判断是否是回车按键
		if(keyCode !== 13) return
		//添加的todo名字不能为空
		if(target.value.trim() === ''){
			alert('输入不能为空')
			return
		}
		//准备好一个todo对象
		const todoObj: ITodo = {
            id:nanoid(),
            task:target.value,
            checked:false,
            start:false,
            done:false
        };
		//将todoObj传递给actionCreater
		dispatch(addTodo(todoObj));
		//清空输入
		target.value = '';
	}

	//用于全选任务
	const handleCheckAll = (event: { target: { checked: boolean; }; }) => {
		currentTodos.map(todoObj => dispatch(updateTodo({
            id:todoObj.id,
            todoObj:{checked:event.target.checked}
        })));
	}

	//用于开始番茄任务
	const handleStart = () => {
        //开始的任务
        const startTodos = currentTodos.filter(todo => !todo.start && todo.checked );
        if(!startTodos.length){
            alert('请选择要开始的任务!');
            return;
        }else if(startTodos.length>48){
            alert('最多可选择48个任务!');
            return;
        }
        //更新todos
        startTodos.map(todoObj => dispatch(updateTodo({
            id:todoObj.id,
            todoObj:{start:true}
        })));
        //倒计时的时间(秒)
        let totalTime = (startTodos.length*30 - 5)*60;
        //开始番茄
        dispatch(addTomato(totalTime));
        //倒计时
        countDown(totalTime,startTodos);
	}

    const countDown = (totalTime: number,start: ITodo[]) => {
        let count:number = totalTime;
        let i:number = 0;//任务的索引值
        let id = setInterval(() => {
            count--;
            dispatch(updateTomato(count));
            if(i < start.length && (totalTime-count) === (1800*i+1500)){
                dispatch(updateTodo({id:start[i].id,todoObj:{done:true}}));
                // console.log(`tomato${count}`);
                console.log('任务完成',start[i].task);
                if(i !== (start.length-1)){
                    alert(`完成任务【${start[i].task}】，休息5分钟吧!`);                
                }
                i++;
            }
            if(i < start.length && (totalTime-count) === 1800*i)
                alert('休息结束，开始下一个任务吧!');
            if(!count){
                dispatch(finishTomato());
                clearInterval(id);
                alert(`完成任务【${start[start.length-1].task}】恭喜你完成所有任务!`);
            }
        },10);
    }

    return (
        <div className="todo-container">
            <div className="todo-wrap">
                <div className="todo-header">
                    <input onKeyUp={handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
                </div>
                <ul className="todo-main">
                    {
                        total ?   
                        currentTodos.map( todoObj => {
                            return <TodoItem key={todoObj.id} {...todoObj}/>
                        }) : 
                        (<div className='empty'>当前任务列表为空，请添加任务!</div>) 
                    }
                </ul>
                <div className="todo-footer">
                    <label>
                        <input type="checkbox" onChange={handleCheckAll} checked={checkedCount === total && total !== 0 ? true : false}/>
                    </label>
                    <span>
                        选中任务数{checkedCount}/当前任务{total}
                    </span>
                    <button 
                        onClick={handleStart} 
                        className={finish ? "btn btn-start":"btn btn-working"}
                        disabled={!finish}
                    >开始任务</button>
                </div>
            </div>
        </div>
    )
}
