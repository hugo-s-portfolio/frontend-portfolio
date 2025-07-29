import React, { FC, ReactElement } from 'react'

import { FormObject } from '@/domain/models'

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

// utils
import { findCharacteristic, findParameter } from '@/infrastructure/ui/utils/finders'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

export interface CardServicesProps {
    aboutMeServices: FormObject
}

export interface ICardService {
    description: string
    title: string
    order: number
    enable: true
    image: { show?: boolean; url?: string }
    action: { show?: boolean; label?: string }
}

const CardServices: FC<CardServicesProps> = ({ aboutMeServices }): ReactElement => {
    const servicesItemList =
        findCharacteristic<ICardService[]>(aboutMeServices, 'services_item_list') || []

    const description = findParameter<string>(aboutMeServices, 'description')

    return (
        <Box
            sx={{
                boxSizing: 'border-box',
            }}
        >
            {aboutMeServices?.show && (
                <Box sx={{ display: 'flex', flexDirection: 'row', my: '15px' }}>
                    {getIcon('DesignServices', { color: 'primary' })}
                    <Typography variant="h2" sx={{ ml: '5px', fontWeight: '500' }}>
                        {aboutMeServices?.label}
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
                        lg: 'flex-start',
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
                                <CardMedia sx={{ height: 140 }} image={image?.url} title={title} />
                            )}
                            <CardContent>
                                {title && (
                                    <Typography gutterBottom variant="h5">
                                        {title}
                                    </Typography>
                                )}
                                {description && (
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {description}
                                    </Typography>
                                )}
                            </CardContent>
                            {action?.show && (
                                <CardActions>
                                    <DefaultButton size="small">{action?.label}</DefaultButton>
                                </CardActions>
                            )}
                        </Card>
                    ))}
            </Box>
        </Box>
    )
}

export default CardServices
