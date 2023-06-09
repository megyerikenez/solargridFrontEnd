import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectStatus } from '../pages/ListProject/DropDown'
import { componentTypeInterface } from './componentTypeReducer'

export interface CustomerInterface {
    name: string
    phone: string
    email: string
}

interface componentPriceInterface {
    name: string
    totalPrice: number
}

interface projectPriceInterface {
    priceByComponent: componentPriceInterface[]
    projectPrice: number
    totalPrice: number
}

interface componentClaimInterface {
    componentType: componentTypeInterface
    quanity: number
    actualQuantity: number
    availableQuantity: number
}

interface optimalPathInterface {
    componentTypeName: string
    location: {
        row: number
        col: number
        level: number
    }
    collectQuantity: number
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
    componentClaims: componentClaimInterface[]
    optimalPath: optimalPathInterface[]
    projectPrice: projectPriceInterface
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
        addOptimalPath: (
            state,
            action: PayloadAction<{
                id: string
                optimalPath: optimalPathInterface[]
            }>
        ) => {
            const { id, optimalPath } = action.payload
            const projectIndex = state.projects.findIndex(
                (project) => project.id === id
            )
            if (projectIndex !== -1) {
                state.projects[projectIndex].optimalPath = optimalPath
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
    addOptimalPath,
} = projectSlice.actions
export default projectSlice.reducer
