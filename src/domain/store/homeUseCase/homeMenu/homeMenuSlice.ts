import { AboutMeMenuConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeMenuState {
    options: AboutMeMenuConfig[]
    loading: boolean
    error: unknown
}

const initialState: HomeMenuState = {
    error: null,
    loading: false,
    options: [],
}

export const homeMenuSlice = createSlice({
    name: 'homeMenu',
    initialState,
    reducers: {
        onError: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoading: (state) => {
            state.loading = true
        },
        onLoad: (state, action: PayloadAction<AboutMeMenuConfig[]>) => {
            state.options = action.payload
            state.loading = false
        },
    },
})

// Actions Creators
export const { onError, onLoading, onLoad } = homeMenuSlice.actions

// Reducers
export default homeMenuSlice.reducer
