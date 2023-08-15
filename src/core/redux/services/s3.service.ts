import { IResponseServer } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';

export const s3Api = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        postSong: builder.mutation<IResponseServer, void>({
            query: () => ({
                url: '/signedUrlS3/audio',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTE5OTgwOTksImV4cCI6MTY5MjI1NzI5OX0.qYOZHiwPlbznVMZtWfQZjMkpHii8tb2mIMZ9hxw6Sqk'
                },
            }),
        }),

        uploadAudio: builder.mutation<void, { privateUrl: string; file: File }>({
            query: ({ privateUrl, file }) => ({
                url: privateUrl,
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            }),
        }),

        postThumnail: builder.mutation<IResponseServer, { uploadId: string, contentType: string }>({
            query: ({ uploadId, contentType }) => ({
                url: '/signedUrlS3/thumbnail',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTE5OTgwOTksImV4cCI6MTY5MjI1NzI5OX0.qYOZHiwPlbznVMZtWfQZjMkpHii8tb2mIMZ9hxw6Sqk'
                },
                body: {
                    uploadId,
                    contentType
                }
            }),
        }),



        uploadThumnail: builder.mutation<void, { privateUrl: string; file: File }>({
            query: ({ privateUrl, file }) => ({
                url: privateUrl,
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            }),
        }),
    }),
});

export const { usePostSongMutation, useUploadAudioMutation, usePostThumnailMutation, useUploadThumnailMutation } = s3Api;
