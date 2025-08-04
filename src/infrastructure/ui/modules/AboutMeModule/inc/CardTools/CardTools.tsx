/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// models
import { FormObject } from '@/domain/models'

// component
import { Box, Skeleton, Typography } from '@/infrastructure/ui/components'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'
import { getCookie } from '@/infrastructure/ui/utils/finders'

// store
import { AppDispatch } from '@/domain/store/store'
import { homeToolsSelector, ProfileConfigState } from '@/domain/store/homeUseCase'
import { onLoadProfileToolsConfig } from '@/domain/store/homeUseCase/homeTools/thunk'

export interface CardToolsProps {
    aboutMeTitle?: FormObject
}

const CardTools: FC<CardToolsProps> = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const token = getCookie('session')

    const { config, loading, error } = useSelector(homeToolsSelector) as ProfileConfigState

    useEffect(() => {
        if (token) {
            dispatch(
                onLoadProfileToolsConfig({
                    country: 'CO',
                    token,
                    moduleName: 'module_about_me_tools',
                }),
            )
        }
    }, [])

    return (
        <>
            {error !== null && <p>Hay un error!</p>}
            {!loading ? (
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        my: '16px',
                    }}
                >
                    {config?.forms?.about_me_title?.show && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', my: '15px' }}>
                            {getIcon('HomeRepairService', { color: 'primary' })}
                            <Typography variant="h2" sx={{ ml: '5px', fontWeight: '500' }}>
                                {config?.forms?.about_me_title?.label}
                            </Typography>
                        </Box>
                    )}

                    {config?.forms?.about_me_description?.show && (
                        <Typography variant="body2" sx={{ mb: '15px' }}>
                            {config?.forms?.about_me_description?.label}
                        </Typography>
                    )}
                </Box>
            ) : (
                <>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        sx={{
                            width: '40%',
                            height: '12px',
                            borderRadius: '8px',
                            marginBottom: '15px',
                        }}
                    />
                    {[1, 2, 3].map((item) => (
                        <Skeleton
                            key={item}
                            animation="wave"
                            variant="rectangular"
                            sx={{
                                width: '100%',
                                height: '10px',
                                borderRadius: '4px',
                                marginBottom: '5px',
                            }}
                        />
                    ))}
                </>
            )}
        </>
    )
}

export default CardTools
