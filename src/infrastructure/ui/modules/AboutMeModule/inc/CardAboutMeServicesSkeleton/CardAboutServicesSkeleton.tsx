/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'

// components
import { Box, CardActions, CardContent, Skeleton } from '@/infrastructure/ui/components'

export interface CardAboutMeServicesSkeletonProps {
    test?: string
}

const CardAboutMeServicesSkeleton: FC<CardAboutMeServicesSkeletonProps> = (): ReactElement => (
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
)

export default CardAboutMeServicesSkeleton
