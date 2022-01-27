import { useAppSelector } from '../../app/hooks'
import CountDown from './CountDown'
import './Tomato.css'

export default function Tomato() {
    const { todos } = useAppSelector(state => state.todos);
    const { value } = useAppSelector(state => state.tomato);

    //开始的任务
    const startTodos = todos.filter(todo => todo.start && !todo.done)
    return (
        <div className="tomato-container">
            <div className="tomato-wrap">
                {value ?
                    (<div>
                        <div className="tomato-countdown">
                            <CountDown />
                        </div>
                        <ul className="tomato-list">
                            {
                                startTodos.map(todo => (
                                    <li key={todo.id} className="tomato-item">
                                        任务:【{todo.task}】
                                    </li>)
                                )
                            }
                        </ul>
                    </div>) :
                    (<div className='time'>00:00</div>)
                }
            </div>

        </div>
    )
}
