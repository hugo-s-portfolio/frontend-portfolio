import createSelector from '../createSelector'
import type { RootState } from '../store'

export const homeProfileSelector = createSelector(
    (state: RootState) => state.homeModule,
    ({ homeProfile }) => homeProfile,
)

export const homeMenuSelector = createSelector(
    (state: RootState) => state.homeModule,
    ({ homeMenu }) => homeMenu,
)

export const homeServicesSelector = createSelector(
    (state: RootState) => state.homeModule,
    ({ homeServices }) => homeServices,
)

export const homeProfileIntroSelector = createSelector(
    (state: RootState) => state.homeModule,
    ({ homeProfileIntro }) => homeProfileIntro,
)

export const homeSpecialtiesSelector = createSelector(
    (state: RootState) => state.homeModule,
    ({ homeSpecialties }) => homeSpecialties,
)

export const homeToolsSelector = createSelector(
    (state: RootState) => state.homeModule,
    ({ homeTools }) => homeTools,
)

export const homeEducationSelector = createSelector(
    (state: RootState) => state.homeModule,
    ({ homeEducation }) => homeEducation,
)
