/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    basePath: '/air-quality-dashboard',
    assetPrefix: '/air-quality-dashboard'
}

module.exports = nextConfig
