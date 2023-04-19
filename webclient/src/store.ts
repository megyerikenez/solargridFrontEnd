import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userReducer'
import { componentTypeSlice } from './reducers/componentTypeReducer'
import { projectSlice } from './reducers/projectReducer'

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        componentReducer: componentTypeSlice.reducer,
        projectReducer: projectSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
