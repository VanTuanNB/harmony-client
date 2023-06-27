import { ESelectReducer } from '@/core/common/constants/reduxSlice.constant';
import environment from '@/environments/environment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootSplitApi = createApi({
    reducerPath: ESelectReducer.API_SERVICE,
    baseQuery: fetchBaseQuery({ baseUrl: `${environment.apiUrl}/${environment.prefix}/${environment.version}` }),
    endpoints: (builder) => ({}),
});
