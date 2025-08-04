import { combineReducers } from '@reduxjs/toolkit'

import {
    homeMenuSlice,
    homeProfileSlice,
    homeServicesSlice,
    homeProfileIntroSlice,
    homeSpecialtiesSlice,
    homeToolsSlice,
    homeEducationSlice,
} from '../homeUseCase'

export const homeReducers = combineReducers({
    homeProfile: homeProfileSlice.reducer,
    homeMenu: homeMenuSlice.reducer,
    homeServices: homeServicesSlice.reducer,
    homeProfileIntro: homeProfileIntroSlice.reducer,
    homeSpecialties: homeSpecialtiesSlice.reducer,
    homeTools: homeToolsSlice.reducer,
    homeEducation: homeEducationSlice.reducer,
})
