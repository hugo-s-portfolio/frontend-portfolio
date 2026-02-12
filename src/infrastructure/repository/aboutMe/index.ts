import { AxiosRequestConfig } from 'axios'

// api
import { http } from '@infrastructure/api'

// models
import { Country } from '@/domain/models'

export const aboutMeRepository = {
    createMobileMenu: async <T>(url: string, data: T, config?: AxiosRequestConfig) =>
        await http.post(url, data, config),
    getAboutMeMenu: async <T>({
        country,
        menuType,
        token,
        locale = 'en',
    }: {
        country: Country
        menuType: string
        token: string
        locale?: string
    }): Promise<T | null> => {
        const url = `/strapi/about-me-menu?country=${country}&menuType=${menuType}&locale=${locale}`

        try {
            const { data } = await http.get<T>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return data
        } catch (error) {
            console.error('Error en config. ', error)

            return null
        }
    },
}
