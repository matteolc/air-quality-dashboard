/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    basePath: '/air-quality-dashboard/docs',
    assetPrefix: '/air-quality-dashboard/docs/'
}

module.exports = nextConfig
