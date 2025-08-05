import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorHomeMenu, onLoadingHomeMenu, onLoadHomeMenu } from '.'

// services
import { aboutMeService } from '@/domain/services/aboutMe'

// models
import { Country } from '@/domain/models'

export interface Management<T> {
    country: Country
    menuType: string
    token: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadAboutMeMenu =
    ({ country, token, menuType, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingHomeMenu())
        try {
            const aboutMenu = await aboutMeService.getAboutMeMenu({
                country,
                menuType,
                token,
            })

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
