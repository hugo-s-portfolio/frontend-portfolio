import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorHomeMenu, onLoadingHomeMenu, onLoadHomeMenu } from '.'

// services
import { aboutMeService } from '@/domain/services/aboutMe'

// models
import { Country } from '@/domain/models'

// utils
import { getCookie } from '@/infrastructure/ui/utils/finders'

export interface Management<T> {
    country: Country
    menuType: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadAboutMeMenu =
    ({ country, menuType, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingHomeMenu())
        const token = getCookie('session')
        try {
            if (!token) {
                return dispatch(onErrorHomeMenu())
            }

            const aboutMenu = await aboutMeService.getAboutMeMenu({
                country,
                menuType,
                token,
            })

            console.log('aboutMenu:', aboutMenu)

            dispatch(onLoadHomeMenu(aboutMenu))

            if (onSuccess && aboutMenu) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorHomeMenu())

            dispatch(onErrorHomeMenu())
            if (onErr) {
                onErr(error)
            }
        }
    }
