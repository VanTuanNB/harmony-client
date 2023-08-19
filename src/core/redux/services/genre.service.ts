import { IGenre, IResponseServer } from "@/core/common/interfaces/index.interface";
import { rootSplitApi } from "./index.service";

export const genreApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceGenre: builder.query<IResponseServer<IGenre[]>, void>({
            query: () => `/genre/`,
        }),
        getServiceGenreTop: builder.query<IResponseServer<IGenre[]>, string>({
            query: (parma?: string) => ({
                url: `/genre/top`,
                params: { item: parma ?? '' }
            }),
        }),
    })
})

export const { useGetServiceGenreQuery, useGetServiceGenreTopQuery } = genreApi; 