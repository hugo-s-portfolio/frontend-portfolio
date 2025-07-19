/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['https://images.unsplash.com/'],
    },
    experimental: {
        esmExternals: true,
    },
}

module.exports = nextConfig
