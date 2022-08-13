import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Question, QuestionsInitialAction, Questions } from '../../interfaces'



const SLICE_NAME = 'questions'
const INITIAL_ACTION_NAME = 'initQuestions'

const initialAction: QuestionsInitialAction = {
  payload: {
    questionsQuantity: 10,
    answersQuantity: 4
  },
  type: `${SLICE_NAME}/${INITIAL_ACTION_NAME}`
}

const initialState: Questions = {
  items: []
}

export const questionsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    [INITIAL_ACTION_NAME]: (state, action = initialAction) => {
      action.payload = {...initialAction.payload, ...action.payload}
      state.items = []
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.items = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { initQuestions, setQuestions } = questionsSlice.actions

export default questionsSlice.reducer