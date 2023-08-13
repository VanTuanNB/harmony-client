import { IAlbum, IResponseServer } from "@/core/common/interfaces/index.interface";
import { rootSplitApi } from "./index.service";

export const albumApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceAlbum: builder.query<IResponseServer<IAlbum>, string>({
            query: (param?: string) => `/album/${param ?? ''}`,
        }),
    })
})

export const { useGetServiceAlbumQuery } = albumApi;