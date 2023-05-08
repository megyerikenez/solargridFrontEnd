import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface componentTypeInterface {
    id: string
    name: string
    price: number
    maxQuantityPerSlot: number
}

export interface componentsTypeStateInterface {
    components: componentTypeInterface[]
}

const initialState: componentsTypeStateInterface = {
    components: [],
}

export const componentTypeSlice = createSlice({
    name: 'componentTypeSlice',
    initialState,
    reducers: {
        addNewComponentType: (
            state,
            action: PayloadAction<componentTypeInterface>
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
            action: PayloadAction<componentTypeInterface>
        ) => {
            for (let i = 0; i < state.components.length; i++) {
                if (state.components[i].id === action.payload.id) {
                    console.log('jovagyok')
                    state.components[i] = action.payload
                }
            }
        },
    },
})

export const { addNewComponentType, updatecomponentType } =
    componentTypeSlice.actions
export default componentTypeSlice.reducer
