import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { QuestionsInitialAction, Batch } from '../../interfaces'



const SLICE_NAME = 'batch'
const INITIAL_ACTION_NAME = 'initBatch'

const initialAction: QuestionsInitialAction = {
  payload: {
    questionsQuantity: 10,
    answersQuantity: 4
  },
  type: `${SLICE_NAME}/${INITIAL_ACTION_NAME}`
}

const initialState: Batch = {
  id: 0,
  questions: []
}

export const batchSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    [INITIAL_ACTION_NAME]: (state, action = initialAction) => {
      action.payload = {...initialAction.payload, ...action.payload}
      state.questions = []
    },
    setBatch: (state, action: PayloadAction<Batch>) => {
      state.id = action.payload.id
      state.questions = action.payload.questions
    },
  },
})

// Action creators are generated for each case reducer function
export const { initBatch, setBatch } = batchSlice.actions

export default batchSlice.reducer