// create a selector which return the project state

import { RootState } from '../store'

export const getProjects = (state: RootState) => state.projectReducer.projects
