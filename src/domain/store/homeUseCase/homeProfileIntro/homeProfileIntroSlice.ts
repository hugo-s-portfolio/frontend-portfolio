import { ConfigModuleModel } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProfileIntroConfigState {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
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
