import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface componentInterface {
    id: string
    name: string
    price: number
    maxQuantityPerSlot: number
}

export interface componentsStateInterface {
    components: componentInterface[]
}

const initialState: componentsStateInterface = {
    components: [],
}

export const componentTypeSlice = createSlice({
    name: 'componentSlice',
    initialState,
    reducers: {
        addNewComponentType: (
            state,
            action: PayloadAction<componentInterface>
        ) => {
            const newComponent = {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                maxQuantityPerSlot: action.payload.maxQuantityPerSlot,
            }
            state.components.push(newComponent)
        },
        updatecomponentType: (
            state,
            action: PayloadAction<componentInterface>
        ) => {
            const index = state.components.findIndex(
                (component) => component.name === action.payload.name
            )
            state.components[index] = action.payload
        },
    },
})

export const { addNewComponentType, updatecomponentType } =
    componentTypeSlice.actions
export default componentTypeSlice.reducer
function useAppDispatch() {
    throw new Error('Function not implemented.')
}
