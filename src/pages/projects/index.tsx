import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

// modules
import { ProjectsView } from '@/infrastructure/ui/modules'

// models
import { ConfigModuleModel, Countries } from '@/domain/models'

// lib
import { getConfig, getLayout } from '@/lib'

// dto
import { getModule } from '@/domain/dto'

export type ProjectsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ProjectsPage = (props: ProjectsPageProps): ReactElement => {
    return <ProjectsView config={props.config} status={props.status} />
}

export default ProjectsPage

ProjectsPage.getLayout = getLayout

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
            (await getConfig({
                country: Countries.CO,
                moduleName: 'module_projects_page',
                token,
                locale: 'en'
            })) || {}

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
