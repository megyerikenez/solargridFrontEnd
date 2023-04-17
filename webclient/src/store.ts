import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userReducer'
import { partSlice } from './reducers/partReducer'
import { projectSlice } from './reducers/projectReducer'

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        partReducer: partSlice.reducer,
        projectReducer: projectSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
