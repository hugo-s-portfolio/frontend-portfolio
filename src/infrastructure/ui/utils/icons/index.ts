import { JSXElementConstructor, ReactElement } from 'react'

export type IIcons = Record<
    string,
    string | ReactElement<unknown, string | JSXElementConstructor<unknown>>
>

export * from './getMUIcons'
