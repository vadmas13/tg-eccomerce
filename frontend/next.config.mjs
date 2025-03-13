/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: "http://localhost:3001/api",
        NEXT_PUBLIC_JWT_SECRET: "23234v25435b453b634b6456342234523b5235"
    },
};

export default nextConfig;
