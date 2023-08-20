import { IResponseServer } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';


export const s3Api = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        postSong: builder.mutation<IResponseServer, void>({
            query: () => ({
                url: '/signedUrlS3/audio',
                method: 'POST',
             
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
