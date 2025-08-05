import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { BlogView } from '@/infrastructure/ui/modules/BlogModule'

// models
import { TabsMenuConfig, ConfigModuleModel, Countries } from '@/domain/models'

// lib
import { getConfig, getLayout, getTabsMenuConfig } from '@/lib'

// dto
import { getModule } from '@/domain/dto'

export type BlogPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const BlogPage = (props: BlogPageProps): ReactElement => {
    return <BlogView config={props.config} status={props.status} />
}

export default BlogPage

BlogPage.getLayout = getLayout

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
            (await getConfig({ country: Countries.CO, moduleName: 'module_blog_page', token })) ||
            {}

        const tabsMenu = await getTabsMenuConfig({
            country: Countries.CO,
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
