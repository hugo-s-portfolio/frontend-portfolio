import React, { FC, ReactElement } from 'react'
import { SpeedDialActionProps as SpeedDialActionPropsMUI } from '@mui/material'

import { StyledSpeedDialAction } from '@/infrastructure/ui/components/inc/SpeedDialAction/speedDialAction-styles'

export type SpeedDialActionProps = SpeedDialActionPropsMUI & {
    key?: string | number
}

const SpeedDialAction: FC<SpeedDialActionProps> = ({ ...rest }): ReactElement => {
    return <StyledSpeedDialAction {...rest} />
}

export default SpeedDialAction
