import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileIntroConfigState extends InitialStatenConfig {
    timestamp?: number
}

const initialState: ProfileIntroConfigState = {
    config: {
        forms: {},
        actions: {},
        formatting: {},
        dataObject: undefined,
    },
    loading: false,
    error: null,
    timestamp: Date.now(),
}

export const homeProfileIntroSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        onErrorProfileIntro: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingProfileIntro: (state) => {
            state.loading = true
        },
        onLoadProfileIntro: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
        },
    },
})

// Actions Creators
export const { onErrorProfileIntro, onLoadingProfileIntro, onLoadProfileIntro } =
    homeProfileIntroSlice.actions

// Reducers
export default homeProfileIntroSlice.reducer
