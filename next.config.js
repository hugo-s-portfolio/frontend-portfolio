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
}

module.exports = nextConfig
