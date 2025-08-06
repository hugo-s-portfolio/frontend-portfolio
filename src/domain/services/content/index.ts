/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'

// repositories
import { contentRepository } from '@/infrastructure/repository/content'

// models
import {
    ResponseConfigModuleModel,
    ConfigModuleModel,
    Country,
    TabsMenuConfig,
    TabsMenuModuleResponse,
} from '@/domain/models'

// dto
import { getModule } from '@/domain/dto'

export const contentModulesServices = {
    getMenuModule: async ({
        country,
        menuType,
        token,
    }: {
        country: Country
        menuType: string
        token: string
    }): Promise<{
        config: TabsMenuConfig[]
        response?: AxiosResponse<TabsMenuModuleResponse, any>
    }> => {
        try {
            const { config, response } = await contentRepository.getMobileMenuOptions({
                country,
                menuType,
                token,
            })

            return { config, response: response }
        } catch (error) {
            console.error('Error modulo de menu principal', error)
            return { config: [], response: undefined }
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
    }): Promise<{
        config: ConfigModuleModel
        response?: AxiosResponse<ResponseConfigModuleModel, any>
    }> => {
        try {
            const { config, response } = await contentRepository.getConfig({
                country,
                moduleName,
                token,
            })

            if (!config)
                return { config: { forms: {}, actions: {}, formatting: {}, dataObject: {} } }

            return { config: getModule(config), response }
        } catch (error) {
            console.error(error)
            return { config: { forms: {}, actions: {}, formatting: {}, dataObject: {} } }
        }
    },
}
