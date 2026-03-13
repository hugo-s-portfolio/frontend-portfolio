import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PaletteName, DEFAULT_PALETTE } from '@infrastructure/ui/styles/palettes'

export interface ThemeState {
    paletteName: PaletteName
}

const initialState: ThemeState = {
    paletteName: (process.env.NEXT_PUBLIC_PALETTE as PaletteName) || DEFAULT_PALETTE,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setPalette: (state, action: PayloadAction<PaletteName>) => {
            state.paletteName = action.payload
        },
    },
})

// Actions Creators
export const { setPalette } = themeSlice.actions

// Reducers
export default themeSlice.reducer
