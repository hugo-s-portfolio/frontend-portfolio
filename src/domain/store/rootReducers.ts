import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import { uiPersistConfig, uiReducers } from './uiUseCase'
import { contentPersistConfig, contentReducers } from './contentUseCase'
import { homePersistConfig, homeReducers } from './homeUseCase'
import { projectsPersistConfig, projectsReducers } from './projectsUseCase'

export const rootReducers = combineReducers({
    homeModule: persistReducer(homePersistConfig, homeReducers),
    uiModule: persistReducer(uiPersistConfig, uiReducers),
    contentModule: persistReducer(contentPersistConfig, contentReducers),
    projectsModule: persistReducer(projectsPersistConfig, projectsReducers),
})
