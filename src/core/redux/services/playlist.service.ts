import { IResponseServer } from "@/core/common/interfaces/index.interface";
import { rootSplitApi } from "./index.service";
import {  IPlaylist } from "@/core/common/interfaces/collection.interface";

export const playlistApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getPlaylistByUserId: builder.query<IResponseServer<IPlaylist[]>, string>({
            query: (param?: string) => `/playlist/${param ?? ''}`,
        }),
    })
})

export const { useGetPlaylistByUserIdQuery } = playlistApi;