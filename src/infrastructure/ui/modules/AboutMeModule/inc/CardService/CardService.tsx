/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    DefaultButton,
    Skeleton,
    Typography,
} from '@/infrastructure/ui/components'

// utils
import { findCharacteristic, findParameter, getCookie } from '@/infrastructure/ui/utils/finders'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

// store
import { AppDispatch } from '@/domain/store/store'
import { homeServicesSelector, ProfileConfigState } from '@/domain/store/homeUseCase'
import { onLoadProfileServicesConfig } from '@/domain/store/homeUseCase/homeServices/thunk'

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
    const dispatch: AppDispatch = useDispatch()
    const token = getCookie('session')

    const { config, loading, error } = useSelector(homeServicesSelector) as ProfileConfigState

    const servicesItemList =
        findCharacteristic<ICardService[]>(
            config?.forms?.about_me_services,
            'services_item_list',
        ) || []

    const description = findParameter<string>(config?.forms?.about_me_services, 'description')

    useEffect(() => {
        if (token) {
            dispatch(
                onLoadProfileServicesConfig({
                    country: 'CO',
                    token,
                    moduleName: 'module_about_me_services',
                }),
            )
        }
    }, [])

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
                            {getIcon('DesignServices', { color: 'primary' })}
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
                    {[1, 2, 3, 4].map((item) => (
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

                    <Box
                        sx={{
                            margin: '20px 0',
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
                        {[1, 2].map((item) => (
                            <Box
                                key={item}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        lg: '48%',
                                    },
                                }}
                            >
                                <Skeleton
                                    animation="wave"
                                    variant="rectangular"
                                    sx={{
                                        width: '100%',
                                        height: '150px',
                                        marginBottom: '5px',
                                    }}
                                />
                                <CardContent>
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        sx={{
                                            width: '30%',
                                            height: '10px',
                                            marginBottom: '20px',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    {[1, 2, 3, 4].map((item) => (
                                        <Skeleton
                                            key={item}
                                            animation="wave"
                                            variant="rectangular"
                                            sx={{
                                                width: '100%',
                                                height: '10px',
                                                marginBottom: '5px',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    ))}
                                </CardContent>
                                <CardActions>
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        sx={{
                                            width: '30%',
                                            height: '10px',
                                            marginBottom: '20px',
                                            borderRadius: '4px',
                                        }}
                                    />
                                </CardActions>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    )
}

export default CardServices
