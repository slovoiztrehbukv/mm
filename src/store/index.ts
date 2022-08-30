import createSagaMiddleware from 'redux-saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import batchReducer from './features/batch'
import settingsReducer from './features/settings'
import authReducer from './features/auth'
import { watcherSaga } from './sagas'

const reducer = combineReducers({
  auth: authReducer,
  batch: batchReducer,
  settings: settingsReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watcherSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch