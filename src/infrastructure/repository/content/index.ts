/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'

// api
import { http } from '@infrastructure/api'

// models
import {
    Config,
    Country,
    ResponseConfigModuleModel,
    TabsMenuConfig,
    TabsMenuModuleResponse,
} from '@/domain/models'

export interface ConfigResponse {
    config?: Config
    response?: AxiosResponse<ResponseConfigModuleModel, any>
}

export interface MenuConfigResponse {
    config: TabsMenuConfig[]
    response?: AxiosResponse<TabsMenuModuleResponse, any>
}

export const contentRepository = {
    getMobileMenuOptions: async ({
        country,
        menuType,
        token,
        locale = 'en'
    }: {
        country: Country
        menuType: string
        token: string
        locale: string
    }): Promise<MenuConfigResponse> => {
        const url = `${process.env.NEXT_PUBLIC_BACK_API}/strapi/tabs-menu?country=${country}&menuType=${menuType}&locale=${locale}`

        try {
            const response = await http.get<TabsMenuModuleResponse>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return { config: response?.data?.data ?? [], response }
        } catch (error) {
            console.error('Error en config. ', error)

            return { config: [], response: undefined }
        }
    },
    getConfig: async ({
        country,
        moduleName,
        token,
        locale = 'en'
    }: {
        country: Country
        moduleName: string
        token: string
        locale?: string
    }): Promise<ConfigResponse> => {
        const url = `/strapi/modules/by-name/${moduleName}?country=${country}&locale=${locale}`

        try {
            const resp = await http.get<ResponseConfigModuleModel>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return { config: resp?.data?.data?.config, response: resp }
        } catch (error) {
            console.error('Error en config. ', error)
            return { config: undefined, response: undefined }
        }
    },
}
