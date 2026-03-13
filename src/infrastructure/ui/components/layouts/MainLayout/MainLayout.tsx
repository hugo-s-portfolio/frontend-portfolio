import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'

import { ThemeProvider } from 'styled-components/macro'
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles'

// base components
import { DefaultCtr, MainMenu, StateLayout } from '@/infrastructure/ui/components'

// styles
import { StyledMainLayout } from '@/infrastructure/ui/components/layouts/MainLayout/mainLayout-styles'
import { Theme, GlobalStyle, DEFAULT_PALETTE, palettes } from '@/infrastructure/ui/styles'
import { createThemeMUI } from '@/infrastructure/ui/styles/Theme'

// utils
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// redux
import { onLoadPaletteConfig } from '@/domain/store/uiUseCase/theme/thunk'
import { ThemeState, themeSelector } from '@domain/store/uiUseCase'

// models
import { Countries } from '@/domain/models'

export type MainLayoutProps = {
    children: React.ReactNode
    metaData?: {
        title?: string
        description?: string
        keywords?: string
        icon?: string
    }
}

const MainLayoutInner: React.FC<MainLayoutProps> = ({ children, metaData }) => {
    const [paletteName, setPaletteName] = useState(DEFAULT_PALETTE)
    const [palettesList, setPalettesList] = useState(palettes)
    const [activePalette, setActivePalettes] = useState(palettes[DEFAULT_PALETTE])

    const theme = Theme()
    const { config, loading, error } = useGetModuleConfig<ThemeState>({
        selector: themeSelector,
        thunkAction: onLoadPaletteConfig({
            country: Countries.CO,
            moduleName: 'module_theme_palette',
        }),
    })

    const muiTheme = useMemo(() => createThemeMUI(activePalette), [activePalette])

    useEffect(() => {
        if (config?.dataObject?.frontend?.active_palette?.name) {
            setPaletteName(config?.dataObject?.frontend?.active_palette?.name)
        }

        if (config?.dataObject?.frontend?.palettes) {
            setActivePalettes(config?.dataObject?.frontend?.palettes[paletteName])
            setPalettesList(config?.dataObject?.frontend?.palettes)
        }
    }, [config, loading, error, paletteName])

    return (
        <>
            <Head>
                <title>{metaData?.title}</title>
                <meta name="description" content={metaData?.description} />
                <meta name="keywords" content={metaData?.keywords} />
                <link rel="icon" href={metaData?.icon ?? '/favicon.ico'} />
            </Head>
            <ThemeProvider theme={theme}>
                <ThemeProviderMUI theme={muiTheme}>
                    <GlobalStyle reset $paletteName={paletteName} $palettesList={palettesList} />
                    <StyledMainLayout>
                        <DefaultCtr>
                            {children}
                            <MainMenu />
                        </DefaultCtr>
                    </StyledMainLayout>
                </ThemeProviderMUI>
            </ThemeProvider>
        </>
    )
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, metaData }) => {
    return (
        <StateLayout>
            <MainLayoutInner metaData={metaData}>{children}</MainLayoutInner>
        </StateLayout>
    )
}

export default MainLayout
