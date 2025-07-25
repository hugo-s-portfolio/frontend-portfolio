import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { ProjectsView } from '@/infrastructure/ui/modules'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'

// lib
import { getConfig, getLayout } from '@/lib'

// dto
import { getModule } from '@/domain/dto'

export type ProjectsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ProjectsPage = (props: ProjectsPageProps): ReactElement => {
    console.error(props)
    return <ProjectsView />
}

export default ProjectsPage

ProjectsPage.getLayout = getLayout

export interface Props {
    status: 'SUCCESS' | 'ERROR'
    config: ConfigModuleModel
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const config =
            (await getConfig({ country: 'CO', moduleName: 'module_projects_page' })) || {}

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
