import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorEducation, onLoadingEducation, onLoadEducation } from '.'

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

export const onLoadProfileEducationConfig =
    ({ country, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingEducation())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorEducation())
            }

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
