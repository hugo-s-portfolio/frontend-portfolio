import { ConfigModuleModel } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ServicesConfigState {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
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
}

export const homeServicesSlice = createSlice({
    name: 'home',
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
        },
    },
})

// Actions Creators
export const { onErrorServices, onLoadingServices, onLoadServices } = homeServicesSlice.actions

// Reducers
export default homeServicesSlice.reducer
