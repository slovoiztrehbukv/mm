import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Question {
    id: number
    title: string
    answers: string[]
    userAnswer: number | null
}

export interface Questions {
  items: Question[]
}

const initialState: Questions = {
  items: []
}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.items = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setQuestions } = questionsSlice.actions

export default questionsSlice.reducer