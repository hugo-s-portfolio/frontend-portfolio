import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { TutorialView } from '@/infrastructure/ui/modules/TutorialsModule'

// models
import { TabsMenuConfig, ConfigModuleModel } from '@/domain/models'

// lib
import { getConfig, getLayout, getTabsMenuConfig } from '@/lib'

// dto
import { getModule } from '@/domain/dto'

export type TutorialsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const TutorialsPage = (props: TutorialsPageProps): ReactElement => {
    return <TutorialView config={props.config} status={props.status} />
}

export default TutorialsPage

TutorialsPage.getLayout = getLayout

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
                moduleName: 'module_tutorials_page',
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
