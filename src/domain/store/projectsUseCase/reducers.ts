import { combineReducers } from '@reduxjs/toolkit'

import { projectsPageSlice } from '../projectsUseCase'

export const projectsReducers = combineReducers({
    projectsPage: projectsPageSlice.reducer,
})
