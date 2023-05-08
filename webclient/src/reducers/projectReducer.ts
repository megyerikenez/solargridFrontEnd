import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectStatus } from '../pages/ListProject/ListProject'

export interface CustomerInterface {
    name: string
    phone: string
    email: string
}

export interface ProjectInterface {
    name: string
    id: string
    place: string
    description: string
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
        updateProjectPrice: (
            state,
            action: PayloadAction<{ id: string; hourlyPrice: string }>
        ) => {
            const { id, hourlyPrice } = action.payload
            const projectIndex = state.projects.findIndex(
                (project) => project.id === id
            )
            if (projectIndex !== -1) {
                state.projects[projectIndex].hourlyPrice = parseInt(hourlyPrice)
            }
        },
        updateProjectWorkHours: (
            state,
            action: PayloadAction<{ id: string; workHours: string }>
        ) => {
            const { id, workHours } = action.payload
            const projectIndex = state.projects.findIndex(
                (project) => project.id === id
            )
            if (projectIndex !== -1) {
                state.projects[projectIndex].workHours = parseInt(workHours)
            }
        },
    },
})

export const {
    addProject,
    updateProject,
    removeProject,
    updateProjectStatus,
    updateProjectPrice,
    updateProjectWorkHours,
} = projectSlice.actions
export default projectSlice.reducer
