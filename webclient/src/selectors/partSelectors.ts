import { RootState } from '../store'

export const selectComponentState = (state: RootState) =>
    state.componentReducer.components
