import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorProfile, onLoadingProfile, onLoadProfile } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

export interface Management<T> {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
    token: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProfileConfig =
    ({ country, token, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingProfile())
        try {
            const profileConfig = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadProfile(profileConfig))

            if (onSuccess && profileConfig) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorProfile())

            dispatch(onErrorProfile())
            if (onErr) {
                onErr(error)
            }
        }
    }
