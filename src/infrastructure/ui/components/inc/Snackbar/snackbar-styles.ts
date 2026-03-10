import tw, { styled } from 'twin.macro'
import { Snackbar, SnackbarProps as SnackbarPropsMUI } from '@mui/material'

export type StyledSnackbarProps = SnackbarPropsMUI

export const StyledSnackbar = styled(Snackbar)`
    ${tw``}
`
