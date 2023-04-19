import { RootState } from '../store'

export const selectComponentTypeState = (state: RootState) =>
    state.componentReducerType.components
export const selectComponentTypeOptions = (state: RootState) =>
    state.componentReducerType.components.map((component) => ({
        id: component.id,
        name: component.name,
    }))
