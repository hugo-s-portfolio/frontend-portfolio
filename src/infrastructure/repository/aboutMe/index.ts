import { AxiosRequestConfig } from 'axios'

// api
import { http } from '@infrastructure/api'

export const aboutMeRepository = {
    createMobileMenu: async <T>(url: string, data: T, config?: AxiosRequestConfig) =>
        await http.post(url, data, config),
    getAboutMeMenu: async <T>({
        country,
        menuType,
        token,
    }: {
        country: 'PY' | 'CO' | 'BO'
        menuType: string
        token: string
    }): Promise<T | null> => {
        const url = `${process.env.NEXT_PUBLIC_BACK_API}/menu/aboutme?country=${country}&menuType=${menuType}`

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
