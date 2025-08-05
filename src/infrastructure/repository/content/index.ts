import { AxiosRequestConfig } from 'axios'

// api
import { http } from '@infrastructure/api'

// models
import { Config, Country, ResponseConfigModuleModel } from '@/domain/models'

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
    }): Promise<Config | undefined> => {
        const url = `/modules?country=${country}&moduleName=${moduleName}`

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
    },
}
