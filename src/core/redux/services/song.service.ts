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
    }),
});

export const { useGetServiceSongsQuery, useGetSuggestSongQuery } = songApi;
