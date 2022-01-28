import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import tomato from './slice/tomatoSlice';  // tomatoReducer
import todos from './slice/todosSlice';    // todosReducer

export const store = configureStore({
  reducer: {
    todos,
    tomato
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {todos: TodosState, tomato: TomatoState}
export type AppDispatch = typeof store.dispatch
// A "thunk" action (a callback function that can be dispatched to the Redux store.)
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;