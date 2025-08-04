import { ConfigModuleModel } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EducationConfigState {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
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
}

export const homeEducationSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        onErrorEducation: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingEducation: (state) => {
            state.loading = true
        },
        onLoadEducation: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
        },
    },
})

// Actions Creators
export const { onErrorEducation, onLoadingEducation, onLoadEducation } = homeEducationSlice.actions

// Reducers
export default homeEducationSlice.reducer
