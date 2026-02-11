import { http } from '@/lib'

import {
    AboutMeMenuConfig,
    AboutMeMenuResponse,
    Config,
    Country,
    ResponseConfigModuleModel,
    TabsMenuConfig,
    TabsMenuModuleResponse,
} from '@/domain/models'

export const getConfig = async ({
    country,
    moduleName,
    token,
    locale = 'en'
}: {
    country: Country
    moduleName: string
    token: string
    locale: string
}): Promise<Config | undefined> => {
    const url = `${process.env.NEXT_PUBLIC_BACK_API}/strapi/modules/by-name/${moduleName}?country=${country}&locale=${locale}`

    try {
        const {
            data: {data}
        } = await http.get<ResponseConfigModuleModel>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return data?.config
    } catch (error) {
        console.error('Error en config. ', error)
    }
}

export const getTabsMenuConfig = async ({
    country,
    menuType,
    token,
    locale = 'en'
}: {
    country: Country
    menuType: string
    token: string
    locale: string
}): Promise<TabsMenuConfig[]> => {
    const url = `${process.env.NEXT_PUBLIC_BACK_API}/strapi/tabs-menu?country=${country}&menuType=${menuType}&locale=${locale}`
    // const url = `${process.env.NEXT_PUBLIC_BACK_API}/menu/tabs?country=${country}&menuType=${menuType}`

    try {
        const {
            data,
        } = await http.get<TabsMenuModuleResponse>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        console.log('data. ', data)

        // if (!response?.config) return []

        return []
        // return response.config
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
    country: Country
    menuType: string
    token: string
}): Promise<AboutMeMenuConfig[]> => {
    // const url = `${process.env.NEXT_PUBLIC_BACK_API}/menu/aboutme?country=${country}&menuType=${menuType}`
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
