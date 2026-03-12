import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

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
    timestamp: 0,
}

export const homeProfileIntroSlice = createSlice({
    name: 'homeProfileIntroSlice',
    initialState,
    reducers: {
        onErrorProfileIntro: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.config = initialState.config
        },
        onLoadingProfileIntro: (state) => {
            state.loading = true
        },
        onLoadProfileIntro: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
            state.error = null
        },
    },
})

// Actions Creators
export const { onErrorProfileIntro, onLoadingProfileIntro, onLoadProfileIntro } =
    homeProfileIntroSlice.actions

// Reducers
export default homeProfileIntroSlice.reducer
