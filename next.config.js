/** @type {import('next').NextConfig} */
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
    
    env: {
        AWS_S3_BUCKET_NAME: 'harmony-music-app',
        AWS_S3_BUCKET_REGION: 'ap-southeast-1',
        AWS_S3_ACCESS_KEY: 'AKIAUHJLEF2N7ZIF5S6L',
        AWS_S3_SECRET_KEY: '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',
    },

};

module.exports = nextConfig;
