import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export interface EducationConfigState extends InitialStatenConfig {
    timestamp?: number
}

const initialState: EducationConfigState = {
    config: {
        forms: {},
        actions: {},
        formatting: {},
        dataObject: undefined,
    },
    loading: false,
    error: null,
    timestamp: 0,
}

export const homeEducationSlice = createSlice({
    name: 'homeEducationSlice',
    initialState,
    reducers: {
        onErrorEducation: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.errorShow = true
            state.config = initialState.config
        },
        onLoadingEducation: (state) => {
            state.loading = true
        },
        onLoadEducation: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
            state.error = null
        },
        onHideToastErrorEducation: (state) => {
            state.errorShow = false
        },
    },
})

// Actions Creators
export const { onErrorEducation, onLoadingEducation, onLoadEducation, onHideToastErrorEducation } =
    homeEducationSlice.actions

// Reducers
export default homeEducationSlice.reducer
