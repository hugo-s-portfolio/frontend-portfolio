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
            state.errorShow = true
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
        onHideToastError: (state) => {
            state.errorShow = false
        },
    },
})

// Actions Creators
export const { onErrorProfile, onLoadingProfile, onLoadProfile, onHideToastError } =
    homeProfileSlice.actions

// Reducers
export default homeProfileSlice.reducer
