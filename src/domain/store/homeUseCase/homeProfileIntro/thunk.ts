import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorProfileIntro, onLoadingProfileIntro, onLoadProfileIntro } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

export interface Management<T> {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
    token: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProfileIntroConfig =
    ({ country, token, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingProfileIntro())
        try {
            const profileConfig = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadProfileIntro(profileConfig))

            if (onSuccess && profileConfig) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorProfileIntro())

            dispatch(onErrorProfileIntro())
            if (onErr) {
                onErr(error)
            }
        }
    }
