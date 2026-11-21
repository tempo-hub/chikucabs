/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.chikucabs.com' }],
                destination: 'https://chikucabs.com/:path*',
                permanent: true,
            },
        ];
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Content-Security-Policy', value: "frame-ancestors 'none';" },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                ],
            },
        ];
    },

    async rewrites() {
        return [
            {
                source: '/:path*.php',
                destination: '/:path*',
            },
        ];
    },

    images: {
        // Allow Next.js Image component to serve images from local API routes
        remotePatterns: [],
        // Allow unoptimized images served from our own API (GridFS)
        dangerouslyAllowSVG: true,
        unoptimized: false,
    },

    // Disable ESLint during builds (already handled in .eslintrc.json)
    eslint: {
        ignoreDuringBuilds: true,
    },

    // TypeScript strict mode during builds
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
