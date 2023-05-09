import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { componentTypeInterface } from './componentTypeReducer'

export interface componentInterface {
    componentType: componentTypeInterface
    id: string
    storage: {
        row: number
        col: number
        level: number
    }
    occupied: boolean
    projectId: string
    quantity: number
}

export interface componentsStateInterface {
    components: componentInterface[]
}

const initialState: componentsStateInterface = {
    components: [],
}

export const componentSlice = createSlice({
    name: 'componentSlice',
    initialState,
    reducers: {
        addNewComponent: (state, action: PayloadAction<componentInterface>) => {
            const newComponent = {
                componentType: action.payload.componentType,
                id: action.payload.id,
                storage: action.payload.storage,
                projectId: action.payload.projectId,
                quantity: action.payload.quantity,
                occupied: false,
            }
            state.components.push(newComponent)
        },
        updateComponent: (state, action: PayloadAction<componentInterface>) => {
            const index = state.components.findIndex(
                (component) => component.id === action.payload.id
            )
            state.components[index] = action.payload
        },
        addComponentFromResponse: (
            state,
            action: PayloadAction<componentInterface[]>
        ) => {
            state.components = action.payload
        },
        addProjectToComponentReducer: (
            state,
            action: PayloadAction<{
                componentId: string
                projectId: string
            }>
        ) => {
            const index = state.components.findIndex(
                (component) => component.id === action.payload.componentId
            )
            state.components[index].projectId = action.payload.projectId
        },
    },
})

export const {
    addNewComponent,
    updateComponent,
    addComponentFromResponse,
    addProjectToComponentReducer,
} = componentSlice.actions
export default componentSlice.reducer
