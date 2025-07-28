import React, { FC, ReactElement } from 'react'

import { SpeedDialProps as SpeedDialPropsMUI } from '@mui/material'

import { StyledSpeedDial } from '@/infrastructure/ui/components/inc/SpeedDial/speedDial-styles'

export type SpeedDialProps = SpeedDialPropsMUI

const SpeedDial: FC<SpeedDialProps> = ({ children, ...rest }): ReactElement => {
    return <StyledSpeedDial {...rest}>{children}</StyledSpeedDial>
}

export default SpeedDial
