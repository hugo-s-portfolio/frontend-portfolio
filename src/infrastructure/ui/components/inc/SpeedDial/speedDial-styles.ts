import tw, { styled } from 'twin.macro'
import { SpeedDialProps, SpeedDial } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IStyledSpeedDial = SpeedDialProps & any

export const StyledSpeedDial = styled<IStyledSpeedDial>(SpeedDial)`
    ${tw``}
`
