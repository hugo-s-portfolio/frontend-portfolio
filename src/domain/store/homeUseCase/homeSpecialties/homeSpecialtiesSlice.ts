import { ConfigModuleModel, InitialStatenConfig } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export interface SpecialtiesConfigState extends InitialStatenConfig {
    timestamp?: number
}

const initialState: SpecialtiesConfigState = {
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

export const homeSpecialtiesSlice = createSlice({
    name: 'homeSpecialtiesSlice',
    initialState,
    reducers: {
        onErrorSpecialties: (state, action: PayloadAction<AxiosError | undefined>) => {
            state.loading = false
            state.error = action.payload
            state.errorShow = true
            state.config = initialState.config
        },
        onLoadingSpecialties: (state) => {
            state.loading = true
        },
        onLoadSpecialties: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
            state.error = null
        },
        onHideToastErrorSpecialties: (state) => {
            state.errorShow = false
        },
    },
})

// Actions Creators
export const {
    onErrorSpecialties,
    onLoadingSpecialties,
    onLoadSpecialties,
    onHideToastErrorSpecialties,
} = homeSpecialtiesSlice.actions

// Reducers
export default homeSpecialtiesSlice.reducer
