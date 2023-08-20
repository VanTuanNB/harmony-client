import { IResponseServer } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';
import { LocalStorageSide } from '@/utils/clientStore.util';
import { ECookieStorage } from '@/core/common/constants/common.constant';

interface IToken {
    accessToken: string;
    refreshToken: string
}
const localStoreInstance = new LocalStorageSide()
const token: IToken = localStoreInstance.getStore(ECookieStorage.HARMONY_USER_TOKEN)

export const s3Api = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        postSong: builder.mutation<IResponseServer, void>({
            query: () => ({
                url: '/signedUrlS3/audio',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token.refreshToken}`
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
                    'Authorization': `Bearer ${token.refreshToken}`
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