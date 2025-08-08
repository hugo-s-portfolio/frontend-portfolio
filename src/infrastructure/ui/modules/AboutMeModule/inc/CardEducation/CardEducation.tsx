/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'

// component
import { Box, Typography } from '@/infrastructure/ui/components'
import { CardAboutMeEducationSkeleton } from '..'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'

// store
import { EducationConfigState, homeEducationSelector } from '@/domain/store/homeUseCase'
import { onLoadProfileEducationConfig } from '@/domain/store/homeUseCase/homeEducation/thunk'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// models
import { Countries } from '@/domain/models'

// enums
import { AboutMeModules } from '@/infrastructure/ui/modules/AboutMeModule/enums'

export interface CardEducationProps {
    test?: string
}

const CardEducation: FC<CardEducationProps> = (): ReactElement => {
    const { config, loading, error } = useGetModuleConfig<EducationConfigState>({
        selector: homeEducationSelector,
        thunkAction: onLoadProfileEducationConfig({
            country: Countries.CO,
            moduleName: AboutMeModules.ModuleAboutMeEducation,
        }),
    })

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
                <CardAboutMeEducationSkeleton />
            )}
        </>
    )
}

export default CardEducation
