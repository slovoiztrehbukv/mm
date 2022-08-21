import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SettingsState } from '../../interfaces'


export const initialState: SettingsState = {
  values: {
    questions: {
      questionsQuantity: 10,
      answersQuantity: 4,
      categoryId: 0,
    }
  }
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsState>) => {
      state.values = action.payload.values
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSettings } = settingsSlice.actions

export default settingsSlice.reducer