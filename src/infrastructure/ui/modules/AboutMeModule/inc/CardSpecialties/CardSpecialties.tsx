/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'
import { useDispatch } from 'react-redux'

// component
import { Box, Typography } from '@/infrastructure/ui/components'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'
import { CardAboutMeSpecialtiesSkeleton, ErrorCard } from '..'

// store
import {
    homeSpecialtiesSelector,
    SpecialtiesConfigState,
    onHideToastError,
} from '@/domain/store/homeUseCase'
import { onLoadProfileSpecialtiesConfig } from '@/domain/store/homeUseCase/homeSpecialties/thunk'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// models
import { Countries } from '@/domain/models'
import { AppDispatch } from '@/domain/store/store'

// enums
import { AboutMeModules } from '@/infrastructure/ui/modules/AboutMeModule/enums'

export interface CardSpecialtiesProps {
    test?: string
}

const CardSpecialties: FC<CardSpecialtiesProps> = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const { config, loading, error, errorShow } = useGetModuleConfig<SpecialtiesConfigState>({
        selector: homeSpecialtiesSelector,
        thunkAction: onLoadProfileSpecialtiesConfig({
            country: Countries.CO,
            moduleName: AboutMeModules.ModuleAboutMeSpecialties,
        }),
    })

    return (
        <>
            {error !== null && (
                <>
                    <ErrorCard
                        error={error}
                        showError={errorShow}
                        componentName="CardSpecialties"
                        onClose={() => {
                            dispatch(onHideToastError())
                        }}
                    />
                    <CardAboutMeSpecialtiesSkeleton />
                </>
            )}
            {!loading ? (
                <Box
                    sx={{
                        boxSizing: 'border-box',
                        my: '16px',
                    }}
                >
                    {config?.forms?.about_me_title?.show && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', my: '15px' }}>
                            {config?.forms?.about_me_title?.icon?.show &&
                                config?.forms?.about_me_title?.icon?.url && (
                                    <>
                                        {getIcon(config?.forms?.about_me_title?.icon?.url, {
                                            color: 'primary',
                                        })}
                                    </>
                                )}
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
                <CardAboutMeSpecialtiesSkeleton />
            )}
        </>
    )
}

export default CardSpecialties
