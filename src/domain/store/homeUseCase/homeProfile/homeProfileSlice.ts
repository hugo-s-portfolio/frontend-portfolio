import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileConfigState extends InitialStatenConfig {
    timestamp?: number
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
    timestamp: Date.now(),
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
