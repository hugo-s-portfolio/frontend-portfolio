import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorTools, onLoadingTools, onLoadTools } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

// utils
import { getCookie } from '@/infrastructure/ui/utils/finders'

// models
import { Country } from '@/domain/models'

export interface Management<T> {
    country: Country
    moduleName: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProfileToolsConfig =
    ({ country, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingTools())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorTools())
            }

            const { config, response } = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadTools(config))

            if (onSuccess && response) {
                onSuccess(response)
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorTools())

            dispatch(onErrorTools())
            if (onErr) {
                onErr(error)
            }
        }
    }
