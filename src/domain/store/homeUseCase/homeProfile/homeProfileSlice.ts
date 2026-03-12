import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

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
    timestamp: 0,
}

export const homeProfileSlice = createSlice({
    name: 'homeProfileSlice',
    initialState,
    reducers: {
        onErrorProfile: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.config = initialState.config
        },
        onLoadingProfile: (state) => {
            state.loading = true
        },
        onLoadProfile: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
            state.error = null
        },
    },
})

// Actions Creators
export const { onErrorProfile, onLoadingProfile, onLoadProfile } = homeProfileSlice.actions

// Reducers
export default homeProfileSlice.reducer
