import { AxiosError } from 'axios'
import { AboutMeMenuConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeMenuState {
    config: AboutMeMenuConfig[]
    loading: boolean
    error: unknown
    timestamp: number
    errorShow?: boolean
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
        onErrorHomeMenu: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.errorShow = true
            state.config = initialState.config
        },
        onLoadingHomeMenu: (state) => {
            state.loading = true
        },
        onLoadHomeMenu: (state, action: PayloadAction<AboutMeMenuConfig[]>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
            state.error = null
        },
        onHideToastErrorHomeMenu: (state) => {
            state.errorShow = false
        },
    },
})

// Actions Creators
export const { onErrorHomeMenu, onLoadingHomeMenu, onLoadHomeMenu, onHideToastErrorHomeMenu } =
    homeMenuSlice.actions

// Reducers
export default homeMenuSlice.reducer
