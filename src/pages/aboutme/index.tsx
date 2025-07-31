import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { AboutMeView } from '@/infrastructure/ui/modules'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'

// lib
import { getConfig, getLayout, getTabsMenuConfig } from '@/lib'

// dto
import { getModule } from '@/domain/dto'
import { TabsMenuConfig } from '@/domain/models'

export type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HomePage = (props: HomePageProps): ReactElement => {
    return <AboutMeView config={props.config} status={props.status} />
}

export default HomePage

HomePage.getLayout = getLayout

export interface Props {
    status: 'SUCCESS' | 'ERROR'
    config: ConfigModuleModel
    tabsMenu: TabsMenuConfig[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const token = ctx.req.cookies.session

    if (!token) {
        return {
            props: {
                status: 'ERROR',
                config: {
                    forms: {},
                    actions: {},
                    formatting: {},
                    dataObject: {},
                },
                tabsMenu: [],
            },
        }
    }

    try {
        const config =
            (await getConfig({
                country: 'CO',
                moduleName: 'module_about_me_page',
                token,
            })) || {}

        const tabsMenu = await getTabsMenuConfig({
            country: 'CO',
            menuType: 'module_tabs',
            token,
        })

        return {
            props: {
                status: 'SUCCESS',
                config: getModule(config),
                tabsMenu,
            },
        }
    } catch (error) {
        console.error({ error })
        return {
            props: {
                status: 'ERROR',
                config: {
                    forms: {},
                    actions: {},
                    formatting: {},
                    dataObject: {},
                },
                tabsMenu: [],
            },
        }
    }
}
