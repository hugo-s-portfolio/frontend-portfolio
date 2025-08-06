/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

// store
import { AppDispatch } from '@/domain/store/store'

// models
import { ProfileConfigState } from '@/domain/store/homeUseCase'
import { ConfigModuleModel } from '@/domain/models'

// utils
import { getCookie } from '../utils/finders'

export interface IUseGetModuleConfigIn {
    selector: (state: unknown) => ProfileConfigState
    thunkAction: ThunkAction<unknown, any, undefined, AnyAction>
}

export interface IUseGetModuleConfigOutput {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
}

const TIMEOUT = parseInt(process.env.NEXT_PUBLIC_STRAPI_TIMEOUT ?? '14400000')

export const useGetModuleConfig = ({
    selector,
    thunkAction,
}: IUseGetModuleConfigIn): IUseGetModuleConfigOutput => {
    const dispatch: AppDispatch = useDispatch()
    const token = getCookie('session')

    const { config, loading, error, timestamp } = useSelector(selector) as ProfileConfigState

    useEffect(() => {
        const cacheValid = Boolean(timestamp && Date.now() - timestamp < TIMEOUT)

        if (token && !cacheValid) {
            dispatch(thunkAction)
        }
    }, [])

    return {
        config,
        loading,
        error,
    }
}
