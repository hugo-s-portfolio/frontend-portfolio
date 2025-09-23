import React, { FC, ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'

// components
import { Box, CircularProgress, Typography } from '@/infrastructure/ui/components'

export interface CircularItemProps {
    key?: number | string
    icon?: string
    label?: string
    value?: number
    enable?: boolean
}

const CircularItem: FC<CircularItemProps> = ({
    icon,
    label,
    value,
    enable = false,
    ...rest
}): ReactElement => {
    const theme = useTheme()

    if (!enable) return <></>

    return (
        <Box
            sx={{
                position: 'relative',
                height: '80px',
                width: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...rest}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70px',
                    width: '70px',
                    position: 'relative',
                }}
            >
                {icon &&
                    getIcon(icon, {
                        color: theme?.palette?.primary?.main,
                        fontSize: 'large',
                        style: { height: '30px', width: '30px' },
                    })}
                {label && (
                    <Typography variant="caption" sx={{ fontSize: icon ? '9px' : '11px' }}>
                        {label}
                    </Typography>
                )}
            </Box>
            <CircularProgress
                size={80}
                variant="determinate"
                value={100}
                sx={() => ({
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                })}
            />
            <CircularProgress
                size={80}
                variant="determinate"
                value={value}
                sx={() => ({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                })}
            />
        </Box>
    )
}

export default CircularItem
