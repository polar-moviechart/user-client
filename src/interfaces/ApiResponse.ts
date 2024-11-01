export interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    data: T;
    errorMsg: string;
}