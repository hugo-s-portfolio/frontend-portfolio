/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'
import { useDispatch } from 'react-redux'

// component
import { Box, Typography } from '@/infrastructure/ui/components'
import { CardAboutMeToolsSkeleton, CircularItemList, ErrorCard } from '..'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'
import { findCharacteristic } from '@/infrastructure/ui/utils/finders'

// store
import {
    homeToolsSelector,
    ToolsConfigState,
    onHideToastErrorTools,
} from '@/domain/store/homeUseCase'
import { onLoadProfileToolsConfig } from '@/domain/store/homeUseCase/homeTools/thunk'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// models
import { Countries } from '@/domain/models'
import { AppDispatch } from '@/domain/store/store'

// enums
import { AboutMeModules } from '@/infrastructure/ui/modules/AboutMeModule/enums'

export interface CardToolsProps {
    test?: string
}

const CardTools: FC<CardToolsProps> = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const { config, loading, error, errorShow } = useGetModuleConfig<ToolsConfigState>({
        selector: homeToolsSelector,
        thunkAction: onLoadProfileToolsConfig({
            country: Countries.CO,
            moduleName: AboutMeModules.ModuleAboutMeTools,
        }),
    })

    const listItems =
        findCharacteristic<
            {
                enable?: true
                icon?: string
                label?: string
                value?: number
            }[]
        >(config?.forms?.about_me_list_tools, 'list') || []

    return (
        <>
            {error !== null && (
                <>
                    <ErrorCard
                        error={error}
                        showError={errorShow}
                        componentName="CardTools"
                        onClose={() => {
                            dispatch(onHideToastErrorTools())
                        }}
                    />
                    <CardAboutMeToolsSkeleton />
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

                    {config?.forms?.about_me_list_tools?.show && (
                        <CircularItemList items={listItems} />
                    )}
                </Box>
            ) : (
                <CardAboutMeToolsSkeleton />
            )}
        </>
    )
}

export default CardTools
