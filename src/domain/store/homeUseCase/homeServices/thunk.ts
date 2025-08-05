import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorServices, onLoadingServices, onLoadServices } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

// utils
import { getCookie } from '@/infrastructure/ui/utils/finders'

// models
import { Countries } from '@/domain/models'

export interface Management<T> {
    country: Countries
    moduleName: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProfileServicesConfig =
    ({ country, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingServices())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorServices())
            }
            const { config, response } = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadServices(config))

            if (onSuccess && response) {
                onSuccess(response)
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorServices())

            dispatch(onErrorServices())
            if (onErr) {
                onErr(error)
            }
        }
    }
