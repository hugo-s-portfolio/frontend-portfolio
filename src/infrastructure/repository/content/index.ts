import { AxiosRequestConfig } from 'axios'

// api
import { http } from '@infrastructure/api'
import { Config, ResponseConfigModuleModel } from '@/domain/models'

export const contentRepository = {
    getMobileMenuOptions: async <T>(config?: AxiosRequestConfig) =>
        await http.get<T>('/content/home', config),
    getConfig: async ({
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
    },
}
