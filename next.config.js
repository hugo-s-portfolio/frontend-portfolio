/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: [
            'https://images.unsplash.com/',
            'https://firebasestorage.googleapis.com/',
            'https://hadiazb-portfolio.s3.us-east-1.amazonaws.com/',
            'https://pub-93495de205c443e1a757fc862f489897.r2.dev/',
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'hadiazb-portfolio.s3.us-east-1.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'pub-93495de205c443e1a757fc862f489897.r2.dev',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        esmExternals: true,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
