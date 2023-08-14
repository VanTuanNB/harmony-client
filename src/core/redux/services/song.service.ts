import { IResponseServer, ISong } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';
interface Post {
    albumReference: string[];
    composerReference: string;
    genresReference: string[];
    performers: string;
    publish: Date;
    title: string;
    uploadId: string;
}
export const songApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceSongs: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => `/song/${param ?? ''}`,
        }),
        getSuggestSong: builder.query<IResponseServer<ISong[]>, { page: number; size: number }>({
            query: (params: { page: number; size: number }) => `/song/suggest?page=${params.page}&size=${params.size}`,
        }),
        getStreamSong: builder.query<string, string>({
            query: (param?: string) => ({
                url: `/song/stream/${param ?? ''}`,
                responseHandler: async (response) => URL.createObjectURL(await response.blob()),
            }),
        }),
        postCreateSong: builder.mutation<IResponseServer, Partial<Post>>({
            query: (body) => ({
                url: '/song/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTE2NzEzNjEsImV4cCI6MTY5MTkzMDU2MX0.vCQk1NNP2-Wk-AeALieTX-TlHs-VuuC_UiKWVJS4tBc',
                },
                body,
            }),
        }),
    }),
});

export const { useGetServiceSongsQuery, useGetSuggestSongQuery, useGetStreamSongQuery, usePostCreateSongMutation } =
    songApi;
