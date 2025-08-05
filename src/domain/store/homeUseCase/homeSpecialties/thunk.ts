import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorSpecialties, onLoadingSpecialties, onLoadSpecialties } from '.'

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

export const onLoadProfileSpecialtiesConfig =
    ({ country, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingSpecialties())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorSpecialties())
            }

            const specialtiesConfig = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadSpecialties(specialtiesConfig))

            if (onSuccess && specialtiesConfig) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorSpecialties())

            dispatch(onErrorSpecialties())
            if (onErr) {
                onErr(error)
            }
        }
    }
