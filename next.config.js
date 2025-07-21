/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['https://images.unsplash.com/', 'https://firebasestorage.googleapis.com/'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        esmExternals: true,
    },
}

module.exports = nextConfig
