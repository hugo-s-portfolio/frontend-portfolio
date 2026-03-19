import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onLoadingProjectsPage, onLoadProjectsPage, onErrorProjectsPage } from '.'

// models
import { Country } from '@/domain/models'

// utils
import { getCookie } from '@/infrastructure/ui/utils/finders'
import { contentModulesServices } from '@/domain/services/content'

export interface Management<T> {
    country: Country
    moduleName: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProjectsPageConfig =
    ({ country, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingProjectsPage())
        const token = getCookie('session')

        try {
            if (!token) {
                return dispatch(onErrorProjectsPage())
            }

            const { config, response } = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadProjectsPage(config))

            if (onSuccess && response) {
                onSuccess(response)
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorProjectsPage())

            dispatch(onErrorProjectsPage(error))
            if (onErr) {
                onErr(error)
            }
        }
    }
