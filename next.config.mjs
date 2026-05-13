/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:path*.php',
                destination: '/:path*',
            },
        ]
    },
};

export default nextConfig;
