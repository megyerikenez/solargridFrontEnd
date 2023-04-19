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

export const componentSlice = createSlice({
    name: 'componentSlice',
    initialState,
    reducers: {
        addNewComponent: (state, action: PayloadAction<componentInterface>) => {
            const newComponent = {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                maxQuantityPerSlot: action.payload.maxQuantityPerSlot,
            }
            state.components.push(newComponent)
        },
        updatecomponent: (state, action: PayloadAction<componentInterface>) => {
            const index = state.components.findIndex(
                (component) => component.name === action.payload.name
            )
            state.components[index] = action.payload
        },
    },
})

export const { addNewComponent, updatecomponent } = componentSlice.actions
export default componentSlice.reducer
function useAppDispatch() {
    throw new Error('Function not implemented.')
}
