/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'

// components
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    DefaultButton,
    Typography,
} from '@/infrastructure/ui/components'
import { CardAboutMeServicesSkeleton } from '..'

// utils
import { findCharacteristic, findParameter } from '@/infrastructure/ui/utils/finders'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

// store
import { homeServicesSelector } from '@/domain/store/homeUseCase'
import { onLoadProfileServicesConfig } from '@/domain/store/homeUseCase/homeServices/thunk'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// models
import { Countries } from '@/domain/models'

export interface CardServicesProps {
    test?: string
}

export interface ICardService {
    description: string
    title: string
    order: number
    enable: true
    image: { show?: boolean; url?: string }
    action: { show?: boolean; label?: string }
}

const CardServices: FC<CardServicesProps> = (): ReactElement => {
    const { config, loading, error } = useGetModuleConfig({
        selector: homeServicesSelector,
        thunkAction: onLoadProfileServicesConfig({
            country: Countries.CO,
            moduleName: 'module_about_me_services',
        }),
    })

    const servicesItemList =
        findCharacteristic<ICardService[]>(
            config?.forms?.about_me_services,
            'services_item_list',
        ) || []

    const description = findParameter<string>(config?.forms?.about_me_services, 'description')

    return (
        <Box
            sx={{
                boxSizing: 'border-box',
            }}
        >
            {error !== null && <p>Hay un error!</p>}
            {!loading ? (
                <>
                    {config?.forms?.about_me_services?.show && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', my: '15px' }}>
                            {config?.forms?.about_me_services?.icon?.show &&
                                config?.forms?.about_me_services?.icon?.url && (
                                    <>
                                        {getIcon(config?.forms?.about_me_services?.icon?.url, {
                                            color: 'primary',
                                        })}
                                    </>
                                )}
                            <Typography variant="h2" sx={{ ml: '5px', fontWeight: '500' }}>
                                {config?.forms?.about_me_services?.label}
                            </Typography>
                        </Box>
                    )}

                    {description && (
                        <Typography variant="body2" sx={{ mb: '15px' }}>
                            {description}
                        </Typography>
                    )}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                lg: 'row',
                            },
                            justifyContent: {
                                xs: 'center',
                                lg: 'space-between',
                            },
                            alignItems: {
                                xs: 'center',
                                lg: 'flex-start',
                            },
                            gap: { xs: '5px', lg: '10px' },
                            flexWrap: 'wrap',
                        }}
                    >
                        {servicesItemList
                            ?.filter((item) => item?.enable)
                            ?.map(({ title, image, order, description, action }) => (
                                <Card
                                    key={order}
                                    sx={{
                                        width: {
                                            xs: '100%',
                                            lg: '48%',
                                        },
                                    }}
                                >
                                    {image?.show && (
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={image?.url}
                                            title={title}
                                        />
                                    )}
                                    <CardContent>
                                        {title && (
                                            <Typography gutterBottom variant="h5">
                                                {title}
                                            </Typography>
                                        )}
                                        {description && (
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {description}
                                            </Typography>
                                        )}
                                    </CardContent>
                                    {action?.show && (
                                        <CardActions>
                                            <DefaultButton size="small">
                                                {action?.label}
                                            </DefaultButton>
                                        </CardActions>
                                    )}
                                </Card>
                            ))}
                    </Box>
                </>
            ) : (
                <CardAboutMeServicesSkeleton />
            )}
        </Box>
    )
}

export default CardServices
