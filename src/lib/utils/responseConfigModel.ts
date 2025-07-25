import {
    Config,
    ResponseConfigModuleModel,
    TabsMenuConfig,
    TabsMenuModuleResponse,
} from '@/domain/models'
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

export const getTabsMenuConfig = async ({
    country,
    menuType,
}: {
    country: 'PY' | 'CO' | 'BO'
    menuType: string
}): Promise<TabsMenuConfig[]> => {
    try {
        const {
            data: { response },
        } = await http.get<TabsMenuModuleResponse>(
            `${process.env.NEXT_PUBLIC_BACK_API}/menu/all?country=${country}&menuType=${menuType}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
                },
            },
        )

        if (!response?.config) return []

        return response.config
    } catch (error) {
        console.error('Error en config. ', error)

        return []
    }
}
