import { Box, Skeleton } from '@/infrastructure/ui/components'

// components
import React, { ReactElement } from 'react'

const CardProfileSkeleton = (): ReactElement => {
    return (
        <Box
            sx={(theme) => ({
                height: { xs: '77vh', md: '88vh' },
                width: { xs: '100%', md: '700px' },
                maxWidth: '768px',
                margin: { md: '0 20px 0 0' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: `0px 0px 5px 0px ${theme.palette.primary.main}`,
                backgroundColor: '#FFFFFF',
            })}
        >
            <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
            <Box
                sx={{
                    width: '100%',
                    height: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '16px 16px',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        width: '170px',
                        height: '170px',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: -85,
                    }}
                >
                    <Skeleton
                        animation="wave"
                        variant="circular"
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </Box>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                        width: '50%',
                        height: '15px',
                        borderRadius: '8px',
                        margin: '100px 0 10px',
                    }}
                />
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                        width: '70%',
                        height: '15px',
                        borderRadius: '8px',
                    }}
                />
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{
                        width: '50%',
                        height: '15px',
                        borderRadius: '8px',
                        margin: '10px 0',
                    }}
                />
            </Box>
        </Box>
    )
}

export default CardProfileSkeleton
