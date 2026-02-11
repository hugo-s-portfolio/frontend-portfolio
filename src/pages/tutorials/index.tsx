import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

// modules
import { TutorialView } from '@/infrastructure/ui/modules/TutorialsModule'

// models
import { ConfigModuleModel, Countries } from '@/domain/models'

// lib
import { getConfig, getLayout } from '@/lib'

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
                moduleName: 'module_tutorials_page',
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
