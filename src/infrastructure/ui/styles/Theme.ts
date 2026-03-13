import { DefaultTheme } from 'styled-components/macro'
import { createTheme } from '@mui/material/styles'

import { PaletteColors, getActivePalette } from './palettes'

export const Theme = (): DefaultTheme => ({
    colors: {
        primary: {
            DEFAULT: 'var(--color-primary)',
            light: 'var(--color-primary-light)',
            dark: 'var(--color-primary-dark)',
        },
        secondary: {
            DEFAULT: 'var(--color-secondary)',
            light: 'var(--color-secondary-light)',
            dark: 'var(--color-secondary-dark)',
        },
        success: {
            DEFAULT: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20',
        },
        error: {
            DEFAULT: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828',
        },
        warning: {
            DEFAULT: '#ed6c02',
            light: '#ff9800',
            dark: '#e65100',
        },
        info: {
            DEFAULT: '#0288d1',
            light: '#03a9f4',
            dark: '#01579b',
        },
        light: {
            DEFAULT: '#F9F9F9',
            light: '#F9F9F9',
            dark: '#F9F9F9',
        },
        dark: {
            DEFAULT: '#112222',
            light: '#112222',
            dark: '#112222',
        },
        white: {
            DEFAULT: '#FFFFFF',
            light: '#FFFFFF',
            dark: '#FFFFFF',
        },
    },

    font: {
        size: {
            xxs: '8px',
            xs: '10px',
            sm: '12px',
            base: '14px',
            md: '16px',
            bg: '18px',
            lg: '24px',
            xl: '28px',
        },
    },

    boxShadow: {
        customMd: '0px 2px 4px #00000014;',
        customCard: '0px 4px 8px #00000029',
        input: '0px 4px 8px #00000014',
        transparent: '0 0 0 1px transparent',
    },

    fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
    },

    screens: {
        xs: '0px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    borderRadius: {
        none: '0',
        xs: '2px',
        sm: '3px',
        md: '5px',
        lg: '10px',
        large: '12px',
    },
})

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
