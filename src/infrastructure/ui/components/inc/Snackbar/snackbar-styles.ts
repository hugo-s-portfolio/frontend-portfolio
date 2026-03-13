import tw, { styled } from 'twin.macro'
import { Snackbar, SnackbarProps as SnackbarPropsMUI } from '@mui/material'
import { StyledShadowInputMixed, StyledShadowMixed } from '@/infrastructure/ui/styles'

export type StyledSnackbarProps = SnackbarPropsMUI

export const StyledSnackbar = styled(Snackbar)`
    .MuiPaper-root {
        ${tw`px-2`}
        ${StyledShadowInputMixed}
        ${StyledShadowMixed}



        .MuiAlert-icon {
            ${tw`flex justify-center items-center`}
        }
    }
`
