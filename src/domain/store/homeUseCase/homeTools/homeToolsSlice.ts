import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export interface ToolsConfigState extends InitialStatenConfig {
    timestamp?: number
}

const initialState: ToolsConfigState = {
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

export const homeToolsSlice = createSlice({
    name: 'homeToolsSlice',
    initialState,
    reducers: {
        onErrorTools: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.errorShow = true
            state.config = initialState.config
        },
        onLoadingTools: (state) => {
            state.loading = true
        },
        onLoadTools: (state, action: PayloadAction<ConfigModuleModel>) => {
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
export const { onErrorTools, onLoadingTools, onLoadTools, onHideToastError } =
    homeToolsSlice.actions

// Reducers
export default homeToolsSlice.reducer
