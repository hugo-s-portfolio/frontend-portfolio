import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaletteName, DEFAULT_PALETTE } from '@infrastructure/ui/styles/palettes'
import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { AxiosError } from 'axios'

export interface ThemeState extends InitialStatenConfig {
    timestamp?: number
    paletteName: PaletteName
}

const initialState: ThemeState = {
    paletteName: (process.env.NEXT_PUBLIC_PALETTE as PaletteName) || DEFAULT_PALETTE,
    error: null,
    loading: false,
    config: {
        forms: {},
        actions: {},
        formatting: {},
        dataObject: undefined,
    },
    timestamp: 0,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        onErrorPalette: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.config = initialState.config
        },
        onLoadPalette: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.paletteName = 'purple'
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
            state.error = null
        },
        onLoadingPalette: (state) => {
            state.loading = true
        },
    },
})

// Actions Creators
export const { onErrorPalette, onLoadPalette, onLoadingPalette } = themeSlice.actions

// Reducers
export default themeSlice.reducer
