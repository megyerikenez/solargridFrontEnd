import { RootState } from '../store'

export const selectPartState = (state: RootState) => state.partReducer.shelf
