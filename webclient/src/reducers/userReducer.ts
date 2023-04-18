import { createSlice } from '@reduxjs/toolkit'

export interface userStateInterface {
    userType: string
    userName: string
    userID: string
    userEmail: string
}

const initialState = {
    userType: '',
    userName: '',
    userID: '',
    userEmail: '',
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload
        },
        setUserName: (state, action) => {
            state.userName = action.payload
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload
        },
        setUserID: (state, action) => {
            state.userID = action.payload
        },
        setUserData(state, action) {
            state.userType = action.payload.userType
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
            state.userID = action.payload.userID
        },
    },
})

export const {
    setUserType,
    setUserName,
    setUserEmail,
    setUserID,
    setUserData,
} = userSlice.actions
export default userSlice.reducer
