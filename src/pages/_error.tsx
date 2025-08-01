import { NextPageContext } from 'next'

export interface ErrorProps {
    statusCode?: number
}

function Error({ statusCode }: ErrorProps): JSX.Element {
    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>¡Ups! Algo salió mal.</h1>
            {statusCode ? (
                <p>Error {statusCode} en el servidor.</p>
            ) : (
                <p>Se produjo un error en el cliente.</p>
            )}
        </div>
    )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res?.statusCode ?? err?.statusCode ?? 404
    return { statusCode }
}

export default Error
