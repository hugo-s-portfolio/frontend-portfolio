import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.status(401).json({ message: 'No refresh token' })
        return
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_API}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        })

        if (!response.ok) {
            res.status(response.status).json({ message: 'Refresh failed' })
            return
        }

        const data = await response.json()
        const newAccessToken = data?.data?.accessToken
        const newRefreshToken = data?.data?.refreshToken

        if (!newAccessToken) {
            res.status(401).json({ message: 'No access token in response' })
            return
        }

        const cookieOptions = [
            `path=/`,
            `max-age=${60 * 60}`,
            process.env.NODE_ENV === 'production' ? 'secure' : '',
            `sameSite=lax`,
        ]
            .filter(Boolean)
            .join('; ')

        const refreshCookieOptions = [
            `path=/`,
            `max-age=${60 * 60 * 24 * 7}`,
            `httpOnly`,
            process.env.NODE_ENV === 'production' ? 'secure' : '',
            `sameSite=lax`,
        ]
            .filter(Boolean)
            .join('; ')

        const cookies = [`session=${newAccessToken}; ${cookieOptions}`]
        if (newRefreshToken) {
            cookies.push(`refreshToken=${newRefreshToken}; ${refreshCookieOptions}`)
        }

        res.setHeader('Set-Cookie', cookies)
        res.status(200).json({ data: { accessToken: newAccessToken } })
    } catch {
        res.status(500).json({ message: 'Internal error' })
    }
}
