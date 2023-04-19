import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userReducer'
import { componentSlice } from './reducers/componentReducer'
import { projectSlice } from './reducers/projectReducer'

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        componentReducer: componentSlice.reducer,
        projectReducer: projectSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
