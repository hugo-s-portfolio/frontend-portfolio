/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'

// component
import { Box, Typography } from '@/infrastructure/ui/components'
import { CardAboutMeToolsSkeleton, CircularItem, CircularItemList } from '..'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'

// store
import { homeToolsSelector, ToolsConfigState } from '@/domain/store/homeUseCase'
import { onLoadProfileToolsConfig } from '@/domain/store/homeUseCase/homeTools/thunk'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// models
import { Countries } from '@/domain/models'

// enums
import { AboutMeModules } from '@/infrastructure/ui/modules/AboutMeModule/enums'
import { findCharacteristic } from '@/infrastructure/ui/utils/finders'

export interface CardToolsProps {
    test?: string
}

const CardTools: FC<CardToolsProps> = (): ReactElement => {
    const { config, loading, error } = useGetModuleConfig<ToolsConfigState>({
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
