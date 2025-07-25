import { Config, ResponseConfigModuleModel } from '@/domain/models'
import { http } from '@/lib'

export const getConfig = async ({
    country,
    moduleName,
}: {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
}): Promise<Config | undefined> => {
    try {
        const {
            data: { response },
        } = await http.get<ResponseConfigModuleModel>(
            `${process.env.NEXT_PUBLIC_BACK_API}/modules?country=${country}&moduleName=${moduleName}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
                },
            },
        )

        return response?.config
    } catch (error) {
        console.error('Error en config. ', error)
    }
}
