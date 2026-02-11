// repositories
import { aboutMeRepository } from '@/infrastructure/repository/aboutMe'

// models
import { AboutMeMenuConfig, AboutMeMenuResponse, Country } from '@/domain/models'

export const aboutMeService = {
    getAboutMeMenu: async ({
        country,
        menuType,
        token,
    }: {
        country: Country
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
            if (!resp.data) return []
            if (!resp.data.length) return []

            return resp.data
        } catch (error) {
            console.error(error)
            return []
        }
    },
}
