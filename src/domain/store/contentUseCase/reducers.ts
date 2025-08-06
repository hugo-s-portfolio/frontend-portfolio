import { combineReducers } from '@reduxjs/toolkit'

import { tabsMenuSlice } from '../contentUseCase'

export const contentReducers = combineReducers({
    tabsMenu: tabsMenuSlice.reducer,
})
