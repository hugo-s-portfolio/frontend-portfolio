import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import { uiPersistConfig, uiReducers } from './uiUseCase'
import { contentPersistConfig, contentReducers } from './contentUseCase'
import { homePersistConfig, homeReducers } from './homeUseCase'

export const rootReducers = combineReducers({
    homeModule: persistReducer(homePersistConfig, homeReducers),
    uiModule: persistReducer(uiPersistConfig, uiReducers),
    contentModule: persistReducer(contentPersistConfig, contentReducers),
})
