import createSelector from '../createSelector'
import type { RootState } from '../store'

export const projectsPageSelector = createSelector(
    (state: RootState) => state.projectsModule,
    ({ projectsPage }) => projectsPage,
)
