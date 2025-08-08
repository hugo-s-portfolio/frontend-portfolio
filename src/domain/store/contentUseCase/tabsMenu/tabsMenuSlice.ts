import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// interfaces
import { TabsMenuConfig } from '@/domain/models'

export interface TabsMenuState {
    config: TabsMenuConfig[]
    loading: boolean
    error: unknown
    timestamp?: number
}

const initialState: TabsMenuState = {
    error: null,
    loading: false,
    config: [],
    timestamp: 0,
}

export const tabsMenuSlice = createSlice({
    name: 'tabsMenuSlice',
    initialState,
    reducers: {
        onErrorTabsMenu: (state) => {
            state.loading = false
            state.error = 'hay error'
        },
        onLoadingTabsMenu: (state) => {
            state.loading = true
        },
        onLoadTabsMenu: (state, action: PayloadAction<TabsMenuConfig[]>) => {
            state.config = action.payload
            state.loading = false
            state.timestamp = Date.now()
        },
    },
})

// Actions Creators
export const { onLoadTabsMenu, onLoadingTabsMenu, onErrorTabsMenu } = tabsMenuSlice.actions

// Reducers
export default tabsMenuSlice.reducer
