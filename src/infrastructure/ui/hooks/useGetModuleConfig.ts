/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

// store
import { AppDispatch } from '@/domain/store/store'

// utils
import { getCookie } from '../utils/finders'

export interface IBaseConfigState {
    config: unknown
    loading: boolean
    error: unknown
    options?: unknown
    timestamp?: number
}

export interface IUseGetModuleConfigIn<T> {
    selector: (state: unknown) => T
    thunkAction: ThunkAction<unknown, any, undefined, AnyAction>
}

export interface IUseGetModuleConfigOutput<T extends IBaseConfigState> {
    config: T['config']
    options: T['options']
    loading: T['loading']
    error: T['error']
    timestamp?: T['timestamp']
}

const TIMEOUT = parseInt(process.env.NEXT_PUBLIC_STRAPI_TIMEOUT ?? '14400000')

export const useGetModuleConfig = <T extends IBaseConfigState>({
    selector,
    thunkAction,
}: IUseGetModuleConfigIn<T>): IUseGetModuleConfigOutput<T> => {
    const dispatch: AppDispatch = useDispatch()
    const token = getCookie('session')
    const timeout = parseInt(getCookie('timeout') ?? TIMEOUT?.toString())

    const { config, loading, error, timestamp, options } = useSelector(selector) as T

    useEffect(() => {
        const cacheValid =
            Boolean(timestamp && Date.now() - timestamp < TIMEOUT) &&
            !Boolean(timestamp && timeout > timestamp)

        if (token && !cacheValid) {
            dispatch(thunkAction)
        }
    }, [])

    return {
        config,
        loading,
        error,
        timestamp,
        options,
    }
}
