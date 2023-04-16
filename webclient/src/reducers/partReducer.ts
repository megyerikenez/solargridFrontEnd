import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface partInterface {
    name: string
    price: number
    maxQuantity: number
}

export interface shelfStateInterface {
    shelf: partInterface[]
}

const initialState: shelfStateInterface = {
    shelf: [],
}

export const partSlice = createSlice({
    name: 'partSlice',
    initialState,
    reducers: {
        addPart: (state, action: PayloadAction<partInterface>) => {
            state.shelf.push(action.payload)
        },
    },
})

export const { addPart } = partSlice.actions
export default partSlice.reducer
