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
    },
})

// Actions Creators
export const { onErrorTools, onLoadingTools, onLoadTools } = homeToolsSlice.actions

// Reducers
export default homeToolsSlice.reducer
