import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorEducation, onLoadingEducation, onLoadEducation } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

export interface Management<T> {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
    token: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProfileEducationConfig =
    ({ country, token, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingEducation())
        try {
            const profileConfig = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadEducation(profileConfig))

            if (onSuccess && profileConfig) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorEducation())

            dispatch(onErrorEducation())
            if (onErr) {
                onErr(error)
            }
        }
    }
