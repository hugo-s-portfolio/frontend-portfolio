/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'

// components
import { Box, Skeleton } from '@/infrastructure/ui/components'

export interface CardAboutMeIntroSkeletonProps {
    test?: string
}

const CardAboutMeIntroSkeleton: FC<CardAboutMeIntroSkeletonProps> = (): ReactElement => (
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
                width: '100%',
                display: 'flex',
                margin: '20px 0',
                flexDirection: {
                    xs: 'column',
                    lg: 'row',
                },
                justifyContent: {
                    lg: 'flex-start',
                },
                alignItems: {
                    lg: 'center',
                },
                flexWrap: 'wrap',
                bgcolor: 'background.paper',
                gap: { xs: '10px', lg: '0' },
            }}
        >
            {[1, 2, 3, 4].map((item) => (
                <Box
                    key={item}
                    sx={{
                        width: {
                            xs: '100%',
                            lg: '48%',
                        },
                        margin: '4px 0',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                        }}
                    />
                    <Box
                        sx={{
                            marginLeft: '10px',
                            width: '70%',
                            height: '100%',
                        }}
                    >
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{
                                width: '100%',
                                height: '10px',
                                borderRadius: '4px',
                                marginBottom: '5px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{
                                width: '70%',
                                height: '10px',
                                borderRadius: '4px',
                                marginBottom: '5px',
                            }}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    </>
)

export default CardAboutMeIntroSkeleton
