import { AxiosError, AxiosResponse, isAxiosError } from 'axios'

// store
import { AppDispatch } from '@/domain/store/store'

// actions
import { onErrorTools, onLoadingTools, onLoadTools } from '.'

// services
import { contentModulesServices } from '@/domain/services/content'

export interface Management<T> {
    country: 'PY' | 'CO' | 'BO'
    moduleName: string
    token: string
    onSuccess?: (data?: T) => void
    onErr?: (err: AxiosError) => void
}

export const onLoadProfileToolsConfig =
    ({ country, token, moduleName, onSuccess, onErr }: Management<AxiosResponse>) =>
    async (dispatch: AppDispatch) => {
        dispatch(onLoadingTools())
        try {
            const toolsConfig = await contentModulesServices.getConfig({
                country,
                moduleName,
                token,
            })

            dispatch(onLoadTools(toolsConfig))

            if (onSuccess && toolsConfig) {
                onSuccess()
            }
        } catch (error) {
            if (!isAxiosError(error)) return dispatch(onErrorTools())

            dispatch(onErrorTools())
            if (onErr) {
                onErr(error)
            }
        }
    }
