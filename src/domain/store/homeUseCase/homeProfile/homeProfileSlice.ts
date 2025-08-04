import { ConfigModuleModel } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileConfigState {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
}

const initialState: ProfileConfigState = {
    config: {
        forms: {},
        actions: {},
        formatting: {},
        dataObject: undefined,
    },
    loading: false,
    error: null,
}

export const homeProfileSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        onErrorProfile: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingProfile: (state) => {
            state.loading = true
        },
        onLoadProfile: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
        },
    },
})

// Actions Creators
export const { onErrorProfile, onLoadingProfile, onLoadProfile } = homeProfileSlice.actions

// Reducers
export default homeProfileSlice.reducer
