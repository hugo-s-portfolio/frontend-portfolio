import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onError, onLoading, onLoad } from '.'

// services
import { aboutMeService } from '@/domain/services/aboutMe'

export interface Management<T> {
    country: 'PY' | 'CO' | 'BO'
    menuType: string
    token: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadAboutMeMenu =
    ({ country, token, menuType, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoading())
        try {
            const aboutMenu = await aboutMeService.getAboutMeMenu({
                country,
                menuType,
                token,
            })

            dispatch(onLoad(aboutMenu))

            if (onSuccess && aboutMenu) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onError())

            dispatch(onError())
            if (onErr) {
                onErr(error)
            }
        }
    }
