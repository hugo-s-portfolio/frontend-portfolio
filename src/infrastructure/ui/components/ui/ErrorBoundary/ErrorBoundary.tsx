/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'

export interface ErrorBoundaryProps {
    children: ReactNode
}

export type RenderReturn =
    | string
    | number
    | boolean
    | Iterable<React.ReactNode>
    | React.PromiseLikeOfReactNode
    | React.JSX.Element
    | null
    | undefined

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state = { hasError: false }

    static getDerivedStateFromError(_: any): {
        hasError: boolean
    } {
        console.error(_)
        return { hasError: true }
    }

    componentDidCatch(error: any, info: any): void {
        console.error('Client-side error:', error, info)
    }

    render(): RenderReturn {
        if (this.state.hasError) {
            return <h1>Ocurrió un error inesperado 😬</h1>
        }

        return this.props.children
    }
}
