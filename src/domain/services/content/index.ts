// repositories
import { contentRepository } from '@/infrastructure/repository/content'

// models
import { ResponseConfigModuleModel, Option, ConfigModuleModel, Country } from '@/domain/models'

// dto
import { getModule } from '@/domain/dto'

export const contentService = {
    getMobileMenuOptions: async () => {
        const response = await contentModulesServices.getMenuModule()

        const options = (response?.config?.dataObject?.frontend?.options as Option[]) || []

        return { options, response: response?.resp }
    },
}

export const contentModulesServices = {
    getMenuModule: async () => {
        try {
            const { data, ...rest } =
                await contentRepository.getMobileMenuOptions<ResponseConfigModuleModel>()
            const config = data?.response?.config
            if (!config) return

            const formattedConfig = getModule(config)

            return { config: formattedConfig, resp: { data, ...rest } }
        } catch (error) {
            console.error('Error modulo de menu principal', error)
        }
    },
    getConfig: async ({
        country,
        moduleName,
        token,
    }: {
        country: Country
        moduleName: string
        token: string
    }): Promise<ConfigModuleModel> => {
        try {
            const config = await contentRepository.getConfig({
                country,
                moduleName,
                token,
            })

            if (!config) return { forms: {}, actions: {}, formatting: {}, dataObject: {} }

            return getModule(config)
        } catch (error) {
            console.error(error)
            return { forms: {}, actions: {}, formatting: {}, dataObject: {} }
        }
    },
}
