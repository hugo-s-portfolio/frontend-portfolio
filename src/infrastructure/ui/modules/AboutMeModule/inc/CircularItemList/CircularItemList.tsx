import React, { FC, ReactElement } from 'react'

import { Box } from '@/infrastructure/ui/components'
import { CircularItem } from '..'

export interface CircularItemListProps {
    items: {
        enable?: boolean
        icon?: string
        label?: string
        value?: number
    }[]
}

const CircularItemList: FC<CircularItemListProps> = ({ items }): ReactElement => {
    return (
        <Box
            sx={{
                padding: '5px',
                margin: '20px 0',
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        >
            {items?.map(({ label, icon, value, enable }) => (
                <CircularItem key={label} label={label} icon={icon} value={value} enable={enable} />
            ))}
        </Box>
    )
}

export default CircularItemList
