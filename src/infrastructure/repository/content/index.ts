/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from 'axios'

// api
import { http } from '@infrastructure/api'

// models
import { Config, Country, ResponseConfigModuleModel } from '@/domain/models'

export interface ConfigResponse {
    config?: Config
    response?: AxiosResponse<ResponseConfigModuleModel, any>
}

export const contentRepository = {
    getMobileMenuOptions: async <T>(config?: AxiosRequestConfig) =>
        await http.get<T>('/content/home', config),
    getConfig: async ({
        country,
        moduleName,
        token,
    }: {
        country: Country
        moduleName: string
        token: string
    }): Promise<ConfigResponse> => {
        const url = `/modules?country=${country}&moduleName=${moduleName}`

        try {
            const resp = await http.get<ResponseConfigModuleModel>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return { config: resp?.data?.response?.config, response: resp }
        } catch (error) {
            console.error('Error en config. ', error)
            return { config: undefined, response: undefined }
        }
    },
}
