import { http } from '@/lib'

import {
    AboutMeMenuConfig,
    AboutMeMenuResponse,
    Config,
    ResponseConfigModuleModel,
    TabsMenuConfig,
    TabsMenuModuleResponse,
} from '@/domain/models'

export const getConfig = async ({
    country,
    moduleName,
    token,
}: {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
    token: string
}): Promise<Config | undefined> => {
    try {
        const {
            data: { response },
        } = await http.get<ResponseConfigModuleModel>(
            `${process.env.NEXT_PUBLIC_BACK_API}/modules?country=${country}&moduleName=${moduleName}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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
    token,
}: {
    country: 'PY' | 'CO' | 'BO'
    menuType: string
    token: string
}): Promise<TabsMenuConfig[]> => {
    try {
        const {
            data: { response },
        } = await http.get<TabsMenuModuleResponse>(
            `${process.env.NEXT_PUBLIC_BACK_API}/menu/tabs?country=${country}&menuType=${menuType}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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

export const getAboutMeMenuConfig = async ({
    country,
    menuType,
    token,
}: {
    country: 'PY' | 'CO' | 'BO'
    menuType: string
    token: string
}): Promise<AboutMeMenuConfig[]> => {
    try {
        const {
            data: { response },
        } = await http.get<AboutMeMenuResponse>(
            `${process.env.NEXT_PUBLIC_BACK_API}/menu/aboutme?country=${country}&menuType=${menuType}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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
