import { JSXElementConstructor, ReactElement, JSX, ElementType } from 'react'
import {
    SvgIconClasses,
    SvgIconPropsColorOverrides,
    SvgIconPropsSizeOverrides,
    SxProps,
    Theme,
} from '@mui/material'
import { CommonProps } from '@mui/material/OverridableComponent'
import { OverridableStringUnion } from '@mui/types'

export type IIcons = Record<
    string,
    string | ReactElement<unknown, string | JSXElementConstructor<unknown>>
>

export type Props = JSX.IntrinsicAttributes & { component?: ElementType<any> } & {
    children?: React.ReactNode
    classes?: Partial<SvgIconClasses>
    color?: OverridableStringUnion<
        | 'inherit'
        | 'action'
        | 'disabled'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning',
        SvgIconPropsColorOverrides
    >
    fontSize?: OverridableStringUnion<
        'inherit' | 'large' | 'medium' | 'small',
        SvgIconPropsSizeOverrides
    >
    htmlColor?: string
    inheritViewBox?: boolean
    shapeRendering?: string
    sx?: SxProps<Theme>
    titleAccess?: string
    viewBox?: string
} & CommonProps &
    Omit<
        any,
        | keyof CommonProps
        | 'children'
        | 'color'
        | 'fontSize'
        | 'htmlColor'
        | 'inheritViewBox'
        | 'shapeRendering'
        | 'sx'
        | 'titleAccess'
        | 'viewBox'
    > & {}

export * from './getMUIcons'
