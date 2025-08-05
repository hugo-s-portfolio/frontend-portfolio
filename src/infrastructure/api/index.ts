import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'
import axiosRetry from 'axios-retry'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_API,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
})

axiosRetry(api, {
    retryDelay: axiosRetry.exponentialDelay,
    retries: 4,
})

api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
            console.error('Unauthorize.')
        }
        return Promise.reject(error)
    },
)

const handleErr = (error: unknown): AxiosResponse | undefined => {
    if (isAxiosError(error)) {
        return error.response
    }
}

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return await api.get<T>(url, config)
}

const _delete = async <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | undefined> => {
    return await api.delete<T>(url, config)
}

const put = async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
): Promise<AxiosResponse<T, D> | undefined> => {
    return await api.put<T>(url, data, config)
}

const post = async <T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
): Promise<AxiosResponse<T, D> | undefined> => {
    return await api.post<T>(url, data, config)
}

export const http = {
    api,
    get,
    delete: _delete,
    put,
    post,
    handleErr,
}
