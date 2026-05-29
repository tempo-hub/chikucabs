/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ignoreDuringBuilds: false,
    },

    // TypeScript strict mode during builds
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
