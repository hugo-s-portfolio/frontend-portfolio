import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { HomeView } from '@/infrastructure/ui/modules'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'

// lib
import { getConfig, getLayout, getTabsMenuConfig } from '@/lib'

// dto
import { getModule } from '@/domain/dto'
import { TabsMenuConfig } from '@/domain/models'

export type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HomePage = (props: HomePageProps): ReactElement => {
    return <HomeView config={props.config} status={props.status} />
}

export default HomePage

HomePage.getLayout = getLayout

export interface Props {
    status: 'SUCCESS' | 'ERROR'
    config: ConfigModuleModel
    tabsMenu: TabsMenuConfig[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const config =
            (await getConfig({ country: 'CO', moduleName: 'module_about_me_page' })) || {}

        const tabsMenu = await getTabsMenuConfig({ country: 'CO', menuType: 'module_tabs' })

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
