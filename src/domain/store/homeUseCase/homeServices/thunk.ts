import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorServices, onLoadingServices, onLoadServices } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

export interface Management<T> {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
    token: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProfileServicesConfig =
    ({ country, token, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingServices())
        try {
            const profileConfig = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadServices(profileConfig))

            if (onSuccess && profileConfig) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorServices())

            dispatch(onErrorServices())
            if (onErr) {
                onErr(error)
            }
        }
    }
