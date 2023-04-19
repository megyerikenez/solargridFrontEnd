import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { componentTypeInterface } from './componentTypeReducer'

export interface componentInterface {
    componentType: componentTypeInterface
    id: string
    storage: string
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
                occupied: action.payload.occupied,
                projectId: action.payload.projectId,
                quantity: action.payload.quantity,
            }
            state.components.push(newComponent)
        },
        updatecomponent: (state, action: PayloadAction<componentInterface>) => {
            const index = state.components.findIndex(
                (component) => component.id === action.payload.id
            )
            state.components[index] = action.payload
        },
    },
})

export const {
    addNewComponent: addNewComponentType,
    updatecomponent: updatecomponentType,
} = componentSlice.actions
export default componentSlice.reducer
