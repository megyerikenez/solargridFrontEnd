import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface componentInterface {
    name: string
    price: number
    maxQuantity: number
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
        addcomponent: (state, action: PayloadAction<componentInterface>) => {
            state.components.push(action.payload)
        },
        updatecomponent: (state, action: PayloadAction<componentInterface>) => {
            const index = state.components.findIndex(
                (component) => component.name === action.payload.name
            )
            state.components[index] = action.payload
        },
    },
})

export const { addcomponent, updatecomponent } = componentSlice.actions
export default componentSlice.reducer
