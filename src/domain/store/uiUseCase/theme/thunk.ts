import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onLoadingPalette, onLoadPalette, onErrorPalette } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

// enums
import { Country } from '@/domain/models/enums'

// utils
import { getCookie } from '@/infrastructure/ui/utils/finders'

export interface Management<T> {
    country: Country
    moduleName: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadPaletteConfig =
    ({ country, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingPalette())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorPalette())
            }

            const { config, response } = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadPalette(config))

            if (onSuccess && response) {
                onSuccess(response)
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorPalette())

            dispatch(onErrorPalette(error))
            if (onErr) {
                onErr(error)
            }
        }
    }
