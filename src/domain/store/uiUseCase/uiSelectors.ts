import createSelector from '../createSelector'
import type { RootState } from '../store'
import {
    PaletteName,
    PaletteColors,
    palettes,
    DEFAULT_PALETTE,
} from '@infrastructure/ui/styles/palettes'

export const themeSelector = createSelector(
    (state: RootState) => state.uiModule,
    ({ theme }) => theme,
)

export const modalsSelector = createSelector(
    (state: RootState) => state.uiModule,
    ({ modals }) => modals,
)

export const paletteNameSelector = createSelector(
    (state: RootState) => state.uiModule,
    ({ theme }): PaletteName => theme.paletteName || DEFAULT_PALETTE,
)

export const activePaletteSelector = createSelector(
    paletteNameSelector,
    (name): PaletteColors => palettes[name] || palettes[DEFAULT_PALETTE],
)
