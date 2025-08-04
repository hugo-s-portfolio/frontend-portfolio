import { ConfigModuleModel } from '@/domain/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SpecialtiesConfigState {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
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
}

export const homeSpecialtiesSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        onErrorSpecialties: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingSpecialties: (state) => {
            state.loading = true
        },
        onLoadSpecialties: (state, action: PayloadAction<ConfigModuleModel>) => {
            state.config = action.payload
            state.loading = false
        },
    },
})

// Actions Creators
export const { onErrorSpecialties, onLoadingSpecialties, onLoadSpecialties } =
    homeSpecialtiesSlice.actions

// Reducers
export default homeSpecialtiesSlice.reducer
