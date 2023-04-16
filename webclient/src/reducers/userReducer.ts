import { createSlice } from '@reduxjs/toolkit'
import { selectUserType } from '../selectors/userSelectors'

export interface userStateInterface {
    userType: string
    userName: string
}

const initialState = {
    userType: '',
    userName: '',
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload
            console.log(selectUserType(state))
        },
    },
})

export const { setUserType } = userSlice.actions
export default userSlice.reducer
