export interface IResponseServer<T = any> {
    status: number;
    success: boolean;
    message: string;
    data: T;
    paging?: {
        page: number;
        size: number;
        totalItems: number;
        totalPages: number;
    };
    error?: unknown;
}
