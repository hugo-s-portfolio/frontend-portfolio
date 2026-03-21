import React, { ReactElement } from 'react'

// styles
import { StyledDesktopMenu } from '@/infrastructure/ui/components/ui/DesktopMenuSkeleton/desktopMenuSkeleton-styles'

// components
import { Box, Skeleton } from '@/infrastructure/ui/components//inc'

const DesktopMenuSkeleton = (): ReactElement => {
    return (
        <StyledDesktopMenu>
            <Box sx={{ position: 'absolute', top: 10, right: '0.75rem' }}>
                <Skeleton
                    animation="wave"
                    variant="circular"
                    sx={{
                        width: '60px',
                        height: '60px',
                    }}
                />
            </Box>
        </StyledDesktopMenu>
    )
}

export default DesktopMenuSkeleton
