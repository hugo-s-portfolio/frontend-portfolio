import React, { FC, ReactElement } from 'react'

import { SnackbarProps as SnackbarPropsMUI } from '@mui/material'
import { StyledSnackbar } from './snackbar-styles'

export type StyledSnackbarProps = SnackbarPropsMUI

const Snackbar: FC<StyledSnackbarProps> = ({ children, ...rest }): ReactElement => {
    return <StyledSnackbar {...rest}>{children}</StyledSnackbar>
}

export default Snackbar
