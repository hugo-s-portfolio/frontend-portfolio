import Head from 'next/head'

import { ThemeProvider } from 'styled-components/macro'
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles'

// base components
import { DefaultCtr, MainMenu, StateLayout } from '@/infrastructure/ui/components'

// styles
import { StyledMainLayout } from '@/infrastructure/ui/components/layouts/MainLayout/mainLayout-styles'
import { Theme, themeMUI, GlobalStyle } from '@/infrastructure/ui/styles'

export type MainLayoutProps = {
    children: React.ReactNode
    metaData?: {
        title?: string
        description?: string
        keywords?: string
        icon?: string
    }
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, metaData }) => {
    const theme = Theme()

    return (
        <StateLayout>
            <Head>
                <title>{metaData?.title}</title>
                <meta name="description" content={metaData?.description} />
                <meta name="keywords" content={metaData?.keywords} />
                <link rel="icon" href={metaData?.icon ?? '/favicon.ico'} />
            </Head>
            <ThemeProvider theme={theme}>
                <ThemeProviderMUI theme={themeMUI}>
                    <GlobalStyle reset />
                    <StyledMainLayout>
                        <DefaultCtr>
                            {children}
                            <MainMenu />
                        </DefaultCtr>
                    </StyledMainLayout>
                </ThemeProviderMUI>
            </ThemeProvider>
        </StateLayout>
    )
}

export default MainLayout
