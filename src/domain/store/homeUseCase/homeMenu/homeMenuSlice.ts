import { AboutMeMenuConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeMenuState {
    config: AboutMeMenuConfig[]
    loading: boolean
    error: unknown
    timestamp: number
}

const initialState: HomeMenuState = {
    error: null,
    loading: false,
    config: [],
    timestamp: 0,
}

export const homeMenuSlice = createSlice({
    name: 'homeMenuSlice',
    initialState,
    reducers: {
        onErrorHomeMenu: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingHomeMenu: (state) => {
            state.loading = true
        },
        onLoadHomeMenu: (state, action: PayloadAction<AboutMeMenuConfig[]>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
        },
    },
})

// Actions Creators
export const { onErrorHomeMenu, onLoadingHomeMenu, onLoadHomeMenu } = homeMenuSlice.actions

// Reducers
export default homeMenuSlice.reducer
