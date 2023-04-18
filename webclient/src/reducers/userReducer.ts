import { createSlice } from '@reduxjs/toolkit'

export interface userStateInterface {
    userType: string
    userName: string
    jwtToken: string
}

const initialState = {
    userType: 'admin',
    userName: '',
    jwtToken: '',
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload
        },
    },
})

export const { setUserType } = userSlice.actions
export default userSlice.reducer
