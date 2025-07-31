import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const tokenCookie = request.cookies.get('session')?.value

    if (tokenCookie) {
        return NextResponse.next()
    }

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
            return NextResponse.next()
        }

        const newResp = await res.json()
        const session = newResp?.response?.data?.jwt
        const response = NextResponse.next()

        response.cookies.set('session', session, {
            path: '/',
            maxAge: 60 * 60 * 60,
        })

        return response
    } catch (error) {
        console.error('Middleware petition', error)
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/', '/aboutme', '/projects', '/blog', '/tutorials'],
}
