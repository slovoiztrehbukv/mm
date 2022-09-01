import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../interfaces'



const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initUser: (state, action) => {
      action.payload = {initialState, ...action.payload}
      state.isAuthenticated = false
      state.user = undefined
    },
    
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
    },
  },
})

// Action creators are generated for each case reducer function
export const { initUser, setAuth } = authSlice.actions

export default authSlice.reducer