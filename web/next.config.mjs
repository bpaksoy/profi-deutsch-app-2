/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/login',
                destination: '/sign-in',
                permanent: true,
            },
            {
                source: '/register',
                destination: '/sign-up',
                permanent: true,
            },
        ];
    },
    env: {
        NEXT_PUBLIC_API_URL: "https://sigsag-api-1032406816801.us-central1.run.app/api",
        NEXT_PUBLIC_API_BASE_URL: "https://sigsag-api-1032406816801.us-central1.run.app/api"
    }
};

export default nextConfig;
