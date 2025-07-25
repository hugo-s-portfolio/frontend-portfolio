import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { BlogView } from '@/infrastructure/ui/modules'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'

// lib
import { getConfig, getLayout } from '@/lib'

// dto
import { getModule } from '@/domain/dto'

export type BlogPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const BlogPage = (props: BlogPageProps): ReactElement => {
    console.error(props)

    return <BlogView />
}

export default BlogPage

BlogPage.getLayout = getLayout

export interface Props {
    status: 'SUCCESS' | 'ERROR'
    config: ConfigModuleModel
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const config = (await getConfig({ country: 'CO', moduleName: 'module_blog_page' })) || {}

        const formattedConfig = getModule(config)

        return {
            props: {
                status: 'SUCCESS',
                config: formattedConfig,
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
