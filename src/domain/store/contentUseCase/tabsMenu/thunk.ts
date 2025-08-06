import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorTabsMenu, onLoadingTabsMenu, onLoadTabsMenu } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

// enums
import { Country } from '@/domain/models/enums'

// utils
import { getCookie } from '@/infrastructure/ui/utils/finders'

export interface Management<T> {
    country: Country
    menuType: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadTabsMainMenu =
    ({ country, menuType, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingTabsMenu())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorTabsMenu())
            }

            const { config, response } = await contentModulesServices.getMenuModule({
                country,
                menuType,
                token,
            })

            dispatch(onLoadTabsMenu(config))

            if (onSuccess && response) {
                onSuccess(response)
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorTabsMenu())

            dispatch(onErrorTabsMenu())
            if (onErr) {
                onErr(error)
            }
        }
    }
