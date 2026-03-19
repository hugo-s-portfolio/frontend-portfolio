import { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConfigModuleModel } from '@/domain/models'

export interface ProjectsPageState {
    config: ConfigModuleModel
    loading: boolean
    error: AxiosError | null | undefined
    errorShow?: boolean
    timestamp?: number
}

const initialState: ProjectsPageState = {
    config: {
        forms: {},
        actions: {},
        formatting: {},
        dataObject: {
            frontend: {
                projects_list: [],
            },
            backend: {},
        },
    },
    loading: false,
    error: null,
    errorShow: false,
    timestamp: 0,
}

export const projectsPageSlice = createSlice({
    name: 'projectsPageSlice',
    initialState,
    reducers: {
        onErrorProjectsPage: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.errorShow = true
            state.config = initialState.config
        },
        onLoadingProjectsPage: (state) => {
            state.loading = true
        },
        onLoadProjectsPage: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
            state.error = null
        },
        onHideToastErrorProjectsPage: (state) => {
            state.errorShow = false
        },
    },
})

// Actions Creators
export const {
    onErrorProjectsPage,
    onLoadingProjectsPage,
    onLoadProjectsPage,
    onHideToastErrorProjectsPage,
} = projectsPageSlice.actions

// Reducers
export default projectsPageSlice.reducer
