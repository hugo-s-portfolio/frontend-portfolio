import React, { FC } from 'react'

import { Box } from '@/infrastructure/ui/components'

export type CardWrapperProps = {
    children: React.ReactNode
}

const CardWrapper: FC<CardWrapperProps> = ({ children }) => {
    return (
        <Box
            sx={(theme) => ({
                height: { md: '88vh' },
                width: { xs: '100%', md: 'calc(100%)' },
                margin: { xs: '16px 0 80px', md: '0' },
                padding: { xs: '16px', lg: '32px' },
                borderRadius: '4px',
                boxSizing: 'border-box',
                boxShadow: `0px 0px 5px 0px ${theme.palette.primary.main}`,
                backgroundColor: '#FFFFFF',
                overflowY: {
                    md: 'scroll',
                },
            })}
        >
            {children}
        </Box>
    )
}

export default CardWrapper
