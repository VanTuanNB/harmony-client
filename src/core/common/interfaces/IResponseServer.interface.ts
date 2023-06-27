export interface IResponseServer<T = any> {
    status: number;
    success: boolean;
    message: string;
    data: T;
    error?: unknown;
}
