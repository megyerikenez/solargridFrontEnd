import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userReducer'

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
    },
})
