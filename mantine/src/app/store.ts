import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
// import listReducer from "./slice/ListSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import aktifitasReducer from './slice/AktifitasSLice'
import userReducer from './slice/User'
export const store = configureStore({
  reducer: {
    // list: listReducer,
    aktifitas: aktifitasReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector