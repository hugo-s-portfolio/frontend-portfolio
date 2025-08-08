import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
    try {
        const response = NextResponse.next()
        await handleAdminContent(response)
        await handleStrapiLogin(request, response)

        return response
    } catch (error) {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/', '/aboutme', '/projects', '/blog', '/tutorials'],
}

export const handleAdminContent = async (response: NextResponse): Promise<void> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/strapi-webhook/status`)

        if (!res.ok) {
            console.error(`Fetch failed: ${res.status}`)
        }

        const newResp = await res.json()
        const updatedAt = newResp?.response?.data?.updatedAt

        response.cookies.set('timeout', updatedAt, {
            path: '/',
            maxAge: 60 * 60 * 60,
        })
    } catch (error) {
        console.error(error)
    }
}

export const handleStrapiLogin = async (
    request: NextRequest,
    response: NextResponse,
): Promise<void> => {
    const tokenCookie = request.cookies.get('session')?.value

    if (tokenCookie) return

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                identifier: process.env.NEXT_PUBLIC_STRAPI_IDENTIFIER,
                password: process.env.NEXT_PUBLIC_STRAPI_PASSWORD,
            }),
        })

        if (!res.ok) {
            console.error(`Token fetch failed: ${res.status}`)
            return
        }

        const newResp = await res.json()
        const session = newResp?.response?.data?.jwt

        response.cookies.set('session', session, {
            path: '/',
            maxAge: 60 * 60 * 60,
        })
    } catch (error) {
        console.error('Middleware petition', error)
    }
}
