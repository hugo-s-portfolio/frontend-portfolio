import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

// modules
import { BlogView } from '@/infrastructure/ui/modules/BlogModule'

// models
import { ConfigModuleModel, Countries } from '@/domain/models'

// lib
import { getConfig, getLayout } from '@/lib'

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
            },
        }
    }

    try {
        const config =
            (await getConfig({ country: Countries.CO, moduleName: 'module_blog_page', token, locale: 'en' })) ||
            {}

        return {
            props: {
                status: 'SUCCESS',
                config: getModule(config),
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
            },
        }
    }
}
