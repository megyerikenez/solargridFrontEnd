import { userStateInterface } from '../reducers/userReducer'

export const selectUserType = (userState: userStateInterface) =>
    userState.userType
export const selectUserName = (userState: userStateInterface) =>
    userState.userName
