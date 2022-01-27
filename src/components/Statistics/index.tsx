import { useAppSelector } from '../../app/hooks'
import './Statistics.css'

export default function Statistics() {
    const { todos } = useAppSelector( state => state.todos);
    //完成的任务数
    const doneTodos = todos.filter(todo => todo.done);
    //总任务数
    const total = todos.length;
    return (
        <div>
            <h3>完成任务数&nbsp;{doneTodos.length + '/' + total}</h3>
                <ul className="done-list">
                    {doneTodos.length ?
                        (doneTodos.map(todoObj => (
                            <li key={todoObj.id} className="done-item">
                                完成任务:【{todoObj.task}】
                            </li>)
                        )) : (<li>暂无已完成任务</li>)
                    }
                </ul> 
        </div>
    )
}
