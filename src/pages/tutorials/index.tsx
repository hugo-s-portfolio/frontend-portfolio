import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { TutorialView } from '@/infrastructure/ui/modules'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'
import { TabsMenuConfig } from '@/domain/models'

// lib
import { getConfig, getLayout, getTabsMenuConfig } from '@/lib'

// dto
import { getModule } from '@/domain/dto'

export type TutorialsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TutorialsPage = (props: TutorialsPageProps): ReactElement => {
    console.error(props)
    return <TutorialView />
}

export default TutorialsPage

TutorialsPage.getLayout = getLayout

export interface Props {
    status: 'SUCCESS' | 'ERROR'
    config: ConfigModuleModel
    tabsMenu: TabsMenuConfig[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const config =
            (await getConfig({ country: 'CO', moduleName: 'module_tutorials_page' })) || {}
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
