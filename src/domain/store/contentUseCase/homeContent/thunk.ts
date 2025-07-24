import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onError, onLoading, onLoad } from '.'

// services
import { contentService } from '@/domain/services/content'

export interface Management<T> {
    onSuccess?: (data: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadOptionMenu =
    ({ onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoading())
        try {
            const { options, response } = await contentService.getMobileMenuOptions()

            dispatch(onLoad(options))

            if (onSuccess && response) {
                onSuccess(response)
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onError())

            dispatch(onError())
            if (onErr) {
                onErr(error)
            }
        }
    }
