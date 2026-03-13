import Head from 'next/head'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { ThemeProvider } from 'styled-components/macro'
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles'

// base components
import { DefaultCtr, MainMenu, StateLayout } from '@/infrastructure/ui/components'

// styles
import { StyledMainLayout } from '@/infrastructure/ui/components/layouts/MainLayout/mainLayout-styles'
import { Theme, GlobalStyle } from '@/infrastructure/ui/styles'
import { createThemeMUI } from '@/infrastructure/ui/styles/Theme'
import { paletteNameSelector, activePaletteSelector } from '@domain/store/uiUseCase'

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
    const theme = Theme()
    const paletteName = useSelector(paletteNameSelector)
    const activePalette = useSelector(activePaletteSelector)
    const muiTheme = useMemo(() => createThemeMUI(activePalette), [activePalette])

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
                    <GlobalStyle reset $paletteName={paletteName} />
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
