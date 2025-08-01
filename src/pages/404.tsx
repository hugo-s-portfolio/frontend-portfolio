import Link from 'next/link'
import Head from 'next/head'

export default function Custom404(): JSX.Element {
    return (
        <>
            <Head>
                <title>Página no encontrada</title>
            </Head>
            <div>
                <h1>404</h1>
                <p>Lo sentimos, la página que buscas no existe.</p>
                <Link href="/">← Volver al inicio</Link>
            </div>
        </>
    )
}
