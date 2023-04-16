import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userReducer'
import { partSlice } from './reducers/partReducer'

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        partReducer: partSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
