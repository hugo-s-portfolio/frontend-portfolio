import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'
import axiosRetry from 'axios-retry'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_API,
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar' },
})

axiosRetry(api, {
    retryDelay: axiosRetry.exponentialDelay,
    retries: 4,
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error) && error.response?.status !== 401
    },
})

api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => Promise.reject(error),
)

let isRefreshing = false
let failedQueue: { resolve: (token: string) => void; reject: (error: unknown) => void }[] = []

const processQueue = (error: unknown, token: string | null = null): void => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (token) {
            resolve(token)
        } else {
            reject(error)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (!isAxiosError(error) || error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        resolve(api(originalRequest))
                    },
                    reject,
                })
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
            const { data } = await axios.post('/api/auth/refresh')

            const newAccessToken = data?.data?.accessToken

            if (!newAccessToken) {
                processQueue(error, null)
                return Promise.reject(error)
            }

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            processQueue(null, newAccessToken)

            return api(originalRequest)
        } catch (refreshError) {
            processQueue(refreshError, null)
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
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
