import { IHistory, IResponseServer } from "@/core/common/interfaces/index.interface";
import { rootSplitApi } from "./index.service";

export const historyApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getHistoryByUserId: builder.query<IResponseServer<IHistory[]>, string>({
            query: (param?: string) => `/favorite/${param ?? ''}`,
        }),
    })
})

export const { useGetHistoryByUserIdQuery } = historyApi;