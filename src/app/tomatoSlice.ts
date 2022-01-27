import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TomatoState {
  finish: boolean,
  value: number
}

const initialState: TomatoState = {
  finish: true,
  value: 0,
}

export const tomatoSlice = createSlice({
  name: 'tomato',
  initialState,
  reducers: {
    addTomato: (state, action: PayloadAction<number>) => {
      state.finish = false;
      state.value = action.payload;
    },
    updateTomato: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    finishTomato: (state) => {
      state.finish = true;
      state.value = 0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTomato, updateTomato, finishTomato } = tomatoSlice.actions
export default tomatoSlice.reducer