import tw, { styled } from 'twin.macro'
import { SpeedDialActionProps, SpeedDialAction } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IStyledSpeedDialAction = SpeedDialActionProps & any

export const StyledSpeedDialAction = styled<IStyledSpeedDialAction>(SpeedDialAction)`
    ${tw``}
`
