import React, { JSXElementConstructor, ReactElement } from 'react'
import * as MUIIcons from '@mui/icons-material'

import { Props } from '.'
import { muiIcons } from './iconsIndex'

export const getIcon = (
    key: string,
    props: Props,
): string | ReactElement<unknown, string | JSXElementConstructor<unknown>> => {
    const icon = muiIcons[key]

    return icon ? React.cloneElement(icon, props) : <MUIIcons.HelpOutline {...props} />
}
