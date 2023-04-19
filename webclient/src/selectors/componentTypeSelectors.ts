import { RootState } from '../store'

export const selectComponentTypeState = (state: RootState) =>
    state.componentReducerType.components
