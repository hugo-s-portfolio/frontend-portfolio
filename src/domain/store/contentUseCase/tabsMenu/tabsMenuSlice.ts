import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// interfaces
// import { Option } from '@/infrastructure/ui/components/ui/MobileMenu/MobileMenu'
import { TabsMenuConfig } from '@/domain/models'

export interface TabsMenuState {
    options: TabsMenuConfig[]
    loading: boolean
    error: unknown
    timestamp?: number
}

const initialState: TabsMenuState = {
    error: null,
    loading: false,
    options: [],
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
            state.options = action.payload
            state.loading = false
            state.timestamp = Date.now()
        },
    },
})

// Actions Creators
export const { onLoadTabsMenu, onLoadingTabsMenu, onErrorTabsMenu } = tabsMenuSlice.actions

// Reducers
export default tabsMenuSlice.reducer
