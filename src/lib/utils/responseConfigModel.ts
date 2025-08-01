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
    const url = `${process.env.NEXT_PUBLIC_BACK_API}/modules?country=${country}&moduleName=${moduleName}`

    try {
        const {
            data: { response },
        } = await http.get<ResponseConfigModuleModel>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

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
    const url = `${process.env.NEXT_PUBLIC_BACK_API}/menu/tabs?country=${country}&menuType=${menuType}`

    try {
        const {
            data: { response },
        } = await http.get<TabsMenuModuleResponse>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

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
    const url = `${process.env.NEXT_PUBLIC_BACK_API}/menu/aboutme?country=${country}&menuType=${menuType}`
    try {
        const {
            data: { response },
        } = await http.get<AboutMeMenuResponse>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response?.config) return []

        return response.config
    } catch (error) {
        console.error('Error en config. ', error)

        return []
    }
}
