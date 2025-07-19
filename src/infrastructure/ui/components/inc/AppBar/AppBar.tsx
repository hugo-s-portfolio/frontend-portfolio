import { FC, ReactElement } from 'react'
import { AppBarProps as AppBarPropsMUI } from '@mui/material'

// styles
import { StyleAppBar } from '@/infrastructure/ui/components/inc/AppBar/appBar-styles'

export type AppBarProps = AppBarPropsMUI

const AppBar: FC<AppBarProps> = ({ children, ...rest }): ReactElement => {
    return <StyleAppBar {...rest}>{children}</StyleAppBar>
}

export default AppBar
