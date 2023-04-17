import { RootState } from '../store'

export const selectUserType = (state: RootState) => state.userReducer.userType

export const selectUserName = (userState: RootState) =>
    userState.userReducer.userName
