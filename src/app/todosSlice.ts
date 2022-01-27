import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITodo {
    id:string,
    task:string,
    checked:boolean,
    start:boolean,
    done:boolean
}
export interface TodosState {
    todos: ITodo[]
}

const initialState: TodosState = {
    todos: [{ id: '01', task: '开始添加任务吧!', checked: false, start: false, done: false }]
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload);
        },
        updateTodo: (state, action: PayloadAction<any>) => {
            state.todos = state.todos.map(todoObj => 
                action.payload.id === todoObj.id ? {...todoObj, ...action.payload.todoObj} : todoObj);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todoObj => todoObj.id !== action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer