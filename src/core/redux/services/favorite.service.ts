import { IFavorite } from "@/core/common/interfaces/collection.interface";
import { IResponseServer } from "@/core/common/interfaces/index.interface";
import { rootSplitApi } from "./index.service";

export const favoriteApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getFavoriteByUserId: builder.query<IResponseServer<IFavorite[]>, string>({
            query: (param?: string) => ({
                url: `/favorite/${param ?? ''}`,
                
            })
        }),
    })
})

export const { useGetFavoriteByUserIdQuery } = favoriteApi;