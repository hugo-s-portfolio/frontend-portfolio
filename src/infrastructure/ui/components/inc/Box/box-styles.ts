/* eslint-disable @typescript-eslint/no-explicit-any */
import tw, { styled } from 'twin.macro'

import { BoxProps as BoxPropsMUI, Box } from '@mui/material'

type BoxProps = BoxPropsMUI & {
    colorBg?: string
} & any

export const StyledBox = styled<BoxProps>(Box)`
    ${tw``}
`
