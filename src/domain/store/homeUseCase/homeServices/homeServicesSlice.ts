import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export interface ServicesConfigState extends InitialStatenConfig {
    timestamp?: number
}

const initialState: ServicesConfigState = {
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

export const homeServicesSlice = createSlice({
    name: 'homeServicesSlice',
    initialState,
    reducers: {
        onErrorServices: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.errorShow = true
            state.config = initialState.config
        },
        onLoadingServices: (state) => {
            state.loading = true
        },
        onLoadServices: (state, action: PayloadAction<ConfigModuleModel>) => {
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
export const { onErrorServices, onLoadingServices, onLoadServices, onHideToastError } =
    homeServicesSlice.actions

// Reducers
export default homeServicesSlice.reducer
