import { ReactElement } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

// modules
import { AboutMeView } from '@/infrastructure/ui/modules'

// lib
import { getConfig, getLayout } from '@/lib'

// models
import { ConfigModuleModel, Countries } from '@/domain/models'

// dto
import { getModule } from '@/domain/dto'

export type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomePage = (props: HomePageProps): ReactElement => {
    return <AboutMeView />
}

export default HomePage

HomePage.getLayout = getLayout

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

    const config =
        (await getConfig({ country: Countries.CO, moduleName: 'module_about_me_page', token, locale: 'en' })) ||
        {}

    try {
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
