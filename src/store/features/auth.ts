import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../interfaces'



const initialState: AuthState = {
  wasUserFetched: false,
  isAuthenticated: false,
  user: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initUser: (state, action) => {
      action.payload = {initialState, ...action.payload}
    },
    
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
      state.wasUserFetched = action.payload.wasUserFetched
    },
  },
})

// Action creators are generated for each case reducer function
export const { initUser, setAuth } = authSlice.actions

export default authSlice.reducer