import { IResponseServer, ISong } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';

export const songApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceSongs: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => `/song/${param ?? ''}`,
        }),
        getSuggestSong: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => `/song/suggest/${param ?? ''}`,
        }),
        getStreamSong: builder.query<string, string>({
            query: (param?: string) => ({
                url: `/song/stream/${param ?? ''}`,
                responseHandler: async (response) => URL.createObjectURL(await response.blob()),
            }),
        }),
    }),
});

export const { useGetServiceSongsQuery, useGetSuggestSongQuery, useGetStreamSongQuery } = songApi;
