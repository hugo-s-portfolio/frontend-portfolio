import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
    try {
        const response = NextResponse.next()
        await handleAuth(request, response)
        await handleCacheTimestamp(request, response)

        return response
    } catch (error) {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/', '/aboutme', '/projects', '/blog', '/tutorials'],
}

const isTokenExpiringSoon = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const exp = payload.exp * 1000
        const now = Date.now()
        const twoMinutes = 2 * 60 * 1000
        return exp - now < twoMinutes
    } catch {
        return true
    }
}

const handleAuth = async (request: NextRequest, response: NextResponse): Promise<void> => {
    const accessToken = request.cookies.get('session')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (accessToken && !isTokenExpiringSoon(accessToken)) {
        return
    }

    if (refreshToken) {
        const refreshed = await handleRefreshToken(refreshToken, response)
        if (refreshed) return
    }

    await handleLogin(response)
}

const handleRefreshToken = async (
    refreshToken: string,
    response: NextResponse,
): Promise<boolean> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        })

        if (!res.ok) return false

        const data = await res.json()
        const newAccessToken = data?.data?.accessToken
        const newRefreshToken = data?.data?.refreshToken

        if (!newAccessToken || !newRefreshToken) return false

        setTokenCookies(response, newAccessToken, newRefreshToken)
        return true
    } catch (error) {
        console.error('Refresh token failed', error)
        return false
    }
}

const handleLogin = async (response: NextResponse): Promise<void> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: process.env.STRAPI_IDENTIFIER,
                password: process.env.STRAPI_PASSWORD,
            }),
        })

        if (!res.ok) {
            console.error(`Login failed: ${res.status}`)
            return
        }

        const data = await res.json()
        const accessToken = data?.data?.accessToken
        const refreshToken = data?.data?.refreshToken

        if (!accessToken) return

        setTokenCookies(response, accessToken, refreshToken)
    } catch (error) {
        console.error('Login failed', error)
    }
}

const setTokenCookies = (
    response: NextResponse,
    accessToken: string,
    refreshToken?: string,
): void => {
    response.cookies.set('session', accessToken, {
        path: '/',
        maxAge: 60 * 60,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    })

    if (refreshToken) {
        response.cookies.set('refreshToken', refreshToken, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })
    }
}

const handleCacheTimestamp = async (
    request: NextRequest,
    response: NextResponse,
): Promise<void> => {
    const accessToken =
        response.cookies.get('session')?.value || request.cookies.get('session')?.value

    if (!accessToken) return

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACK_API}/strapi/webhook/cache-timestamp`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            },
        )

        if (!res.ok) return

        const data = await res.json()
        const timestamp = data?.data?.timestamp

        if (timestamp) {
            const timestampMs = new Date(timestamp).getTime().toString()
            response.cookies.set('timeout', timestampMs, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            })
        }
    } catch (error) {
        console.error('Cache timestamp check failed', error)
    }
}
