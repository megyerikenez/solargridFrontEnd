import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectStatus } from '../pages/ListProject/ListProject'

export interface CustomerInterface {
    name: string
    phone: string
    email: string
}

export interface ProjectInterface {
    id: string
    place: string
    description: string
    buyer: string
    status: string
    customer: CustomerInterface
    hourlyPrice: number
    workHours: number
    projectPhase: {
        name: string
    }
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
            action: PayloadAction<{ id: string; status: ProjectStatus }>
        ) => {
            const { id, status } = action.payload
            const projectIndex = state.projects.findIndex(
                (project) => project.id === id
            )
            if (projectIndex !== -1) {
                state.projects[projectIndex].status = status
            }
        },
        updateProjectHourlyPrice: (
            state,
            action: PayloadAction<{ id: string; price: number }>
        ) => {
            const { id, price } = action.payload
            const projectIndex = state.projects.findIndex(
                (project) => project.id === id
            )
            if (projectIndex !== -1) {
                state.projects[projectIndex].hourlyPrice = price
            }
        },
    },
})

export const { addProject, updateProject, removeProject, updateProjectStatus } =
    projectSlice.actions
export default projectSlice.reducer
