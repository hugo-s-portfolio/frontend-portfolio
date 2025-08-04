import { ConfigModuleModel } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ToolsConfigState {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
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
}

export const homeToolsSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        onErrorTools: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingTools: (state) => {
            state.loading = true
        },
        onLoadTools: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
        },
    },
})

// Actions Creators
export const { onErrorTools, onLoadingTools, onLoadTools } = homeToolsSlice.actions

// Reducers
export default homeToolsSlice.reducer
