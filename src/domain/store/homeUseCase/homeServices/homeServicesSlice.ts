import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
        onErrorServices: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingServices: (state) => {
            state.loading = true
        },
        onLoadServices: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
        },
    },
})

// Actions Creators
export const { onErrorServices, onLoadingServices, onLoadServices } = homeServicesSlice.actions

// Reducers
export default homeServicesSlice.reducer
