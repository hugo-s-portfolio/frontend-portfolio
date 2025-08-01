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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getDerivedStateFromError(_: any): {
        hasError: boolean
    } {
        console.error(_)
        return { hasError: true }
    }

    // eslint-disable-next-file @typescript-eslint/no-explicit-any
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
