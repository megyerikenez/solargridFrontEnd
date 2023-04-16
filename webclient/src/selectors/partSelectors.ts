// create a selector that returns the part state
import { shelfStateInterface } from '../reducers/partReducer'
export const selectPartState = (state: shelfStateInterface) => state.shelf
