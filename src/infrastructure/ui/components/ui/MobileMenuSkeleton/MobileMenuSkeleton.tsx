import React, { ReactElement } from 'react'

// styles
import { StyledMenuMobile } from '@/infrastructure/ui/components/ui/MobileMenuSkeleton/mobileMenuSkeleton-styles'

// base component
import { Box, Skeleton } from '@/infrastructure/ui/components'

const MobileMenuSkeleton = (): ReactElement => (
    <StyledMenuMobile>
        <Box sx={{ display: 'flex', flexDirection: 'row', margin: '5px 10%' }}>
            {[1, 2, 3, 4].map((item) => (
                <Box
                    key={item}
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        sx={{
                            width: '25px',
                            height: '25px',
                            margin: '8px 3px',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                        }}
                    />

                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        sx={{
                            width: '50px',
                            height: '8px',
                            margin: '3px 8px',
                            borderRadius: '5px',
                            boxSizing: 'border-box',
                        }}
                    />
                </Box>
            ))}
        </Box>
    </StyledMenuMobile>
)

export default MobileMenuSkeleton
