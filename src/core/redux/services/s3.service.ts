import { IResponseServer } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';

export const s3Api = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        postSong: builder.mutation<IResponseServer, void>({
            query: () => ({
                url: '/signedUrlS3/audio',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTE2NzEzNjEsImV4cCI6MTY5MTkzMDU2MX0.vCQk1NNP2-Wk-AeALieTX-TlHs-VuuC_UiKWVJS4tBc'
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
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTE2NzEzNjEsImV4cCI6MTY5MTkzMDU2MX0.vCQk1NNP2-Wk-AeALieTX-TlHs-VuuC_UiKWVJS4tBc'
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
