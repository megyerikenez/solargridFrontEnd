import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './reducers/userReducer'
import { componentTypeSlice } from './reducers/componentTypeReducer'
import { projectSlice } from './reducers/projectReducer'
import { componentSlice } from './reducers/componentReducer'

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        componentReducerType: componentTypeSlice.reducer,
        componentReducer: componentSlice.reducer,
        projectReducer: projectSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
