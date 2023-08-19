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
        getServiceSongsJustReleased: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => ({
                url: '/song/released',
                params: { item: param ?? '' },
            }),
        }),
        getServiceSongsViewTop: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => ({
                url: '/song/songTop',
                params: { item: param ?? '' },
            }),
        }),
        postCreateSong: builder.mutation<IResponseServer, Partial<Post>>({
            query: (body) => ({
                url: '/song/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmYTBmMmUzOC1jNGI2LTQ0MDUtOGY4OS0zNWIxYzUxZTg1ZDQiLCJlbWFpbCI6Imh1eW5xcHMxNjkxOEBmcHQuZWR1LnZuIiwicm9sZSI6ImNvbXBvc2VyIiwiaWF0IjoxNjkyMjU3NDYwLCJleHAiOjE2OTQ4NDk0NjB9.dhhHL8X9SykQWhGUYI6foyokVpDCUpJ4sswYCUfokQ8'},
                body,
            }),
        }),
    }),
});

export const { useGetServiceSongsQuery, useGetSuggestSongQuery, useGetStreamSongQuery, usePostCreateSongMutation, useGetServiceSongsJustReleasedQuery, useGetServiceSongsViewTopQuery } = songApi;

