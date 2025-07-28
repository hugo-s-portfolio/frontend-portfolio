import React, { FC, ReactElement } from 'react'
import { SpeedDialIconProps as SpeedDialIconPropsMUI } from '@mui/material'

import { StyledSpeedDialIcon } from '@/infrastructure/ui/components/inc/SpeedDialIcon/speedDialIcon-styles'

export type SpeedDialIconProps = SpeedDialIconPropsMUI & {
    key?: string | number
}

const SpeedDialIcon: FC<SpeedDialIconProps> = ({ ...props }): ReactElement => {
    return <StyledSpeedDialIcon {...props} />
}

export default SpeedDialIcon
