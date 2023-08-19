/** @type {import('next').NextConfig} */
const path = require('path');
// const environment = require('./src/environments/environment.ts');
// đoãn mã trên sau khi run build rồi mới chạy tạm thời cứ sài đoạn này
const isEnvProduction = process.env.NODE_ENV === 'production';

const environment = {
    origin: isEnvProduction ? 'http://localhost:3000' : 'http://localhost:3000',
    apiUrl: isEnvProduction ? 'http://localhost:5000' : 'http://localhost:5000',
    prefix: 'api',
    version: 'v1',
};
const nextConfig = {
    assetPrefix: `${environment.origin}`,
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'platform-lookaside.fbsbx.com',
            'harmony-music-app.s3.ap-southeast-1.amazonaws.com',
            'fullstack.edu.vn',
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'global')],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Cấu hình CORS tại đây
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.ALLOWED_ORIGIN': JSON.stringify('*'), // Cấu hình tên miền cho Access-Control-Allow-Origin
            }),
        );

        return config;
    },
};

module.exports = nextConfig;
