import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { deleteTodo, ITodo, updateTodo } from '../../../app/slice/todosSlice'
import './TodoItem.css'

export default function TodoItem(props:ITodo) {
    const {id,task,checked} = props;
    const dispatch = useAppDispatch();
    //标识鼠标移入、移出
    const [mouse, setMouse] = useState(false)

	//鼠标移入、移出的回调
	const handleMouse = (flag:boolean) => {
		return ()=>{
			setMouse(flag);
		}
	}

	//勾选、取消勾选某一个todo的回调
	const handleCheck = (todoObj:ITodo) => {
        return (event: { target: { checked: boolean; }; }) => {
            dispatch(updateTodo({...todoObj, checked:event.target.checked}));
		}
	}

	//删除一个todo的回调
	const handleDelete = (id:string) => {
		if(window.confirm('确定删除吗？')){
			dispatch(deleteTodo(id));
		}
	}

    return (
        <li style={{backgroundColor:mouse ? '#ddd' : 'white'}} onMouseEnter={handleMouse(true)} onMouseLeave={handleMouse(false)}>
            <label>
                <input type="checkbox" checked={checked} onChange={handleCheck(props)}/>
                <span>{task}</span>
            </label>
            <button onClick={() => handleDelete(id) } className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button>
        </li>
    );
}
