import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectStatus } from '../pages/ListProject/ListProject'

export interface CustomerInterface {
    name: string
    phone: string
    email: string
}

export interface ProjectInterface {
    id: number
    place: string
    description: string
    buyer: string
    status: string
    customer: CustomerInterface
}

export interface ProjectStateInterface {
    projects: ProjectInterface[]
}

const initialState: ProjectStateInterface = {
    projects: [],
}

export const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<ProjectInterface>) => {
            state.projects.push(action.payload)
        },
        updateProject: (state, action: PayloadAction<ProjectInterface>) => {
            const index = state.projects.findIndex(
                (project) => project.place === action.payload.place
            )
            state.projects[index] = action.payload
        },
        removeProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter(
                (project) => project.place !== action.payload
            )
        },
        updateProjectStatus: (
            state,
            action: PayloadAction<{ id: number; status: ProjectStatus }>
        ) => {
            const { id, status } = action.payload
            const projectIndex = state.projects.findIndex(
                (project) => project.id === id
            )
            if (projectIndex !== -1) {
                state.projects[projectIndex].status = status
            }
        },
    },
})

export const { addProject, updateProject, removeProject, updateProjectStatus } =
    projectSlice.actions
export default projectSlice.reducer
