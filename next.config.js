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
};

module.exports = nextConfig;
