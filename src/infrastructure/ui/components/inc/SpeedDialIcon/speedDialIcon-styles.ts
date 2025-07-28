/* eslint-disable @typescript-eslint/no-explicit-any */
import tw, { styled } from 'twin.macro'
import { SpeedDialIconProps, SpeedDialIcon } from '@mui/material'

type IStyledSpeedDialIcon = SpeedDialIconProps & any

export const StyledSpeedDialIcon = styled<IStyledSpeedDialIcon>(SpeedDialIcon)`
    ${tw``}
`
