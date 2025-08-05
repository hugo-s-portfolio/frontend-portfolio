import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorProfile, onLoadingProfile, onLoadProfile } from '.'

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

export const onLoadProfileConfig =
    ({ country, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingProfile())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorProfile())
            }

            const { config, response } = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadProfile(config))

            if (onSuccess && response) {
                onSuccess(response)
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorProfile())

            dispatch(onErrorProfile())
            if (onErr) {
                onErr(error)
            }
        }
    }
