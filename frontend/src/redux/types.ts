export interface ApiResponse<T = Record<string, unknown>> {
    statusCode: number;
    message: string;
    data?: T;
}

export interface ApiError {
    statusCode?: number;
    message?: string;
    errorMessage?: string;
}
