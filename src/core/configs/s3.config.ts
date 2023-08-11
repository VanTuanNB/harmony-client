import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const { S3Client, GetObjectCommand, AbortMultipartUploadCommand } = require('@aws-sdk/client-s3');
const s3Client = new S3Client({
    region: process.env.AWS_S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.AWS_S3_SECRET_KEY ?? '',
    },
});
console.log(s3Client);
const command = new AbortMultipartUploadCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: 'audio/BatTinhYeuLen-TangDuyTanHoaMinzy-9022462.mp3',
    UploadId: 'STRING_VALUE', // required
    RequestPayer: 'requester',
});
console.log(command);
async function getObjectUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
    });

    try {
        const response = await getSignedUrl(s3Client, command);
        console.log(response);
        // const objectUrl = response["@odata.mediaReadLink"]; // hoặc response.Body để lấy nội dung đối tượng

        // return objectUrl;
    } catch (error) {
        console.error('Error getting object from S3:', error);
        return null;
    }
}

getObjectUrl('audio/BatTinhYeuLen-TangDuyTanHoaMinzy-9022462.mp3');
const obj = { mesage: 1 };
export default obj;
