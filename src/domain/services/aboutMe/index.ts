// repositories
import { AboutMeMenuConfig, AboutMeMenuResponse } from '@/domain/models'
import { aboutMeRepository } from '@/infrastructure/repository/aboutMe'

export const aboutMeService = {
    getAboutMeMenu: async ({
        country,
        menuType,
        token,
    }: {
        country: 'PY' | 'CO' | 'BO'
        menuType: string
        token: string
    }): Promise<AboutMeMenuConfig[]> => {
        try {
            const resp = await aboutMeRepository.getAboutMeMenu<AboutMeMenuResponse>({
                country,
                menuType,
                token,
            })

            if (!resp) return []
            if (!resp.response) return []
            if (!resp.response.config) return []

            return resp.response.config
        } catch (error) {
            console.error(error)
            return []
        }
    },
}
