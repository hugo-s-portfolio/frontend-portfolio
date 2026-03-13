import { DefaultTheme } from 'styled-components/macro'
import { createTheme } from '@mui/material/styles'

import { PaletteColors, getActivePalette } from './palettes'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const themeTokens = require('./ThemeTW')

export const Theme = (): DefaultTheme => themeTokens as DefaultTheme

export function createThemeMUI(activePalette: PaletteColors): ReturnType<typeof createTheme> {
    const theme = Theme()
    return createTheme({
        palette: {
            primary: {
                main: activePalette.primary.DEFAULT,
                light: activePalette.primary.light,
                dark: activePalette.primary.dark,
            },
            secondary: {
                main: activePalette.secondary.DEFAULT,
                light: activePalette.secondary.light,
                dark: activePalette.secondary.dark,
            },
            success: {
                main: theme.colors.success.DEFAULT,
                light: theme.colors.success.light,
                dark: theme.colors.success.dark,
            },
            warning: {
                main: theme.colors.warning.DEFAULT,
                light: theme.colors.warning.light,
                dark: theme.colors.warning.dark,
            },
            info: {
                main: theme.colors.info.DEFAULT,
                light: theme.colors.info.light,
                dark: theme.colors.info.dark,
            },
            error: {
                main: theme.colors.error.DEFAULT,
                light: theme.colors.error.light,
                dark: theme.colors.error.dark,
            },
        },
        typography: {
            fontFamily: [theme.fontFamily.montserrat, theme.fontFamily.helvetica].join(','),
        },
        breakpoints: {
            values: {
                xs: parseInt(theme.screens.xs.split('p')[0]),
                sm: parseInt(theme.screens.sm.split('p')[0]),
                md: parseInt(theme.screens.md.split('p')[0]),
                lg: parseInt(theme.screens.lg.split('p')[0]),
                xl: parseInt(theme.screens.xl.split('p')[0]),
            },
        },
        components: {
            MuiTypography: {
                styleOverrides: {
                    h1: {
                        fontSize: 30,
                        fontWeight: 600,
                    },
                    h2: {
                        fontSize: 20,
                        fontWeight: 400,
                    },
                    h3: {
                        fontSize: 18,
                        fontWeight: 400,
                    },
                    h4: {
                        fontSize: 16,
                        fontWeight: 400,
                    },
                    h5: {
                        fontSize: 14,
                        fontWeight: 400,
                    },
                    h6: {
                        fontSize: 12,
                        fontWeight: 400,
                    },
                    subtitle1: {
                        fontSize: 18,
                        fontWeight: 600,
                    },
                },
            },
        },
    })
}

export const themeMUI = createThemeMUI(getActivePalette())
