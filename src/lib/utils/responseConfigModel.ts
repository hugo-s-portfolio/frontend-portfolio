import { Config, ResponseConfigModuleModel } from '@/domain/models'
import { http } from '@/lib'
import {
    StrapiModulesResponse,
    Config as StrapiConfig,
} from '@/pages/api/interfaces/strapi/response-config-modules.model'

export const responseStructure = (
    config: Config,
    status: 'SUCCESS' | 'ERROR',
): ResponseConfigModuleModel => {
    return {
        response: {
            result: {
                code: 200,
                status: status === 'SUCCESS' ? 'SUCCESS' : 'ERROR',
                result_message: {
                    value: status === 'SUCCESS' ? 'Ejecución exitosa!' : 'Ejecución erronea',
                    formattedValue:
                        status === 'SUCCESS' ? 'Ejecución exitosa!' : 'Ejecución erronea',
                    show: true,
                },
            },
            config: status === 'SUCCESS' ? config : undefined,
        },
    }
}

export const getConfig = async ({
    country,
    moduleName,
}: {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
}): Promise<StrapiConfig | undefined> => {
    try {
        const {
            data: { data },
        } = await http.get<StrapiModulesResponse>(
            `api/modules?filters[country][$eq]=${country}&filters[moduleName][$eq]=${moduleName}&populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
                },
            },
        )

        if (!data) return
        if (!data[0].config) return

        return data[0].config
    } catch (error) {
        console.error(error)
    }
}
