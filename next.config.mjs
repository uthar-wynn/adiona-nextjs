/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true, // Enable React Strict Mode for better error reporting
    webpack(config, { dev }) {
        if (dev) {
            config.optimization.minimize = false; // Disable minification in development for better debugging
        }
        return config;
    },
};

export default nextConfig;