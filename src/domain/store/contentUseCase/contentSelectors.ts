import createSelector from '../createSelector'
import type { RootState } from '../store'

export const menuMobileOptionSelector = createSelector(
    (state: RootState) => state.contentModule,
    ({ tabsMenu }) => tabsMenu,
)
