import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { AboutMeView } from '@/infrastructure/ui/modules'

// models
import { TabsMenuConfig } from '@/domain/models'

// lib
import { getLayout, getTabsMenuConfig } from '@/lib'

export type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomePage = (props: HomePageProps): ReactElement => {
    return <AboutMeView />
}

export default HomePage

HomePage.getLayout = getLayout

export interface Props {
    status: 'SUCCESS' | 'ERROR'
    tabsMenu: TabsMenuConfig[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const token = ctx.req.cookies.session

    if (!token) {
        return {
            props: {
                status: 'ERROR',
                tabsMenu: [],
            },
        }
    }

    try {
        const tabsMenu = await getTabsMenuConfig({
            country: 'CO',
            menuType: 'module_tabs',
            token,
        })

        return {
            props: {
                status: 'SUCCESS',
                tabsMenu,
            },
        }
    } catch (error) {
        console.error({ error })
        return {
            props: {
                status: 'ERROR',
                tabsMenu: [],
            },
        }
    }
}
