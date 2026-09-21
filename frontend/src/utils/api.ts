import type {
    AxiosError,
    AxiosHeaderValue,
    AxiosInstance,
    AxiosResponse,
    // InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

const ContentType = {
    json: 'application/json',
    binary: 'application/octet-stream',
} as const;

type ContentType = (typeof ContentType)[keyof typeof ContentType];

interface ApiOptions {
    xApiKey: string;
    baseUrl: string;
}

interface ApiHeaderOptions {
    token?: string;
    contentType?: ContentType;
    workspace?: string;
}

interface ApiRequestOptions {
    queries?: Record<string, string | number>;
    token?: string;
    signal?: AbortController;
    workspace?: string;
}

interface ApiPagination {
    page: number;
    perPage: number;
    orderBy: string;
    orderDirection: string;
    search?: string;
}

interface ApiMetadataResponse {
    languages: string[];
    timestamp: number;
    timezone: string;
    path: string;
    version: string;
    repoVersion: string;
}

interface ApiResponse<T = Record<string, unknown>> {
    statusCode: number;
    message: string;
    _metadata: ApiMetadataResponse;
    data?: T;
}

interface ApiPaginationMetadataResponse {
    search?: string;
    filter?: Record<string, string>;
    page: number;
    perPage: number;
    orderBy: string;
    orderDirection: string;
    availableSearch: string[];
    availableOrderBy: string[];
    availableOrderDirection: string[];
    total: number;
    totalPage: number;
}

interface ApiPaginationResponse<T = Record<string, unknown>> extends Omit<
    ApiResponse<T>,
    '_metadata' | 'data'
> {
    _metadata: ApiPaginationMetadataResponse;
    data: T[];
}

// interface ApiErrorResponse extends ApiResponse {}

export default class Api {
    private readonly maxRedirects: number = 3;

    // private readonly defaultLanguage: string = 'en';

    private readonly requestTimeout: number = 30000; // 30s, in ms

    private readonly defaultHeaders: Record<string, AxiosHeaderValue> = {
        'Content-Type': ContentType.json,
    };

    private readonly api: AxiosInstance;

    private readonly baseUrl: string;

    private readonly xApiKey: string;

    constructor(options: ApiOptions) {
        this.baseUrl = options.baseUrl;
        this.xApiKey = options.xApiKey;

        const headers = this.setHeaders();
        this.api = axios.create({
            timeout: this.requestTimeout,
            baseURL: this.baseUrl,
            maxRedirects: this.maxRedirects,
            headers,
        });

        this.setInterceptor();
    }

    private setHeaders(
        options?: ApiHeaderOptions
    ): Record<string, AxiosHeaderValue> {
        const headers: Record<string, AxiosHeaderValue> = {
            ...this.defaultHeaders,
            'x-api-key': this.xApiKey,
        };

        if (options?.token) {
            headers.Authorization = `Bearer ${options.token}`;
        }
        if (options?.workspace) {
            headers['x-workspace'] = `${options.workspace}`;
        }

        return headers;
    }

    private setInterceptor(): void {
        this.api.interceptors.response.use(
            (response: AxiosResponse<ApiResponse>) => {
                const httpCode = response.status;

                if (httpCode === 401) {
                    // TODO: LOGOUT
                    // TODO: CHANGE WITH YOUR ERROR SCHEMA
                    throw new Error('Unauthorized');
                } else if (httpCode === 403) {
                    // TODO: SWITCH CASE
                    // 1. CHECK USER IF HAVE AT LEAST 1 WORKSPACE
                    // 2. NOT HAVE PERMISSION
                    // TODO: CHANGE WITH YOUR ERROR SCHEMA
                    throw new Error('Forbidden');
                } else if (httpCode >= 200 && httpCode < 300) {
                    // Proses respons yang sukses
                    return response;
                }
                // TODO: CHANGE WITH YOUR ERROR SCHEMA
                throw new Error('Internal Server Error');
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    async get<T = Record<string, unknown>>(
        url: string,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.get<ApiResponse<T>>(url, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async getPagination<T = Record<string, unknown>>(
        url: string,
        pagination: ApiPagination,
        options?: ApiRequestOptions
    ): Promise<ApiPaginationResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.get<ApiPaginationResponse<T>>(url, {
            params: { ...options?.queries, ...pagination },
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async post<T = Record<string, unknown>>(
        url: string,
        data?: Record<string, unknown>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.post<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async postForm<T = Record<string, unknown>>(
        url: string,
        data?: Record<string, unknown>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.postForm<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async put<T = Record<string, unknown>>(
        url: string,
        data?: Record<string, unknown>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.put<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async patch<T = Record<string, unknown>>(
        url: string,
        data?: Record<string, unknown>,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.patch<ApiResponse<T>>(url, data, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }

    async delete<T = Record<string, unknown>>(
        url: string,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const headers = this.setHeaders(options);

        const response = await this.api.delete<ApiResponse<T>>(url, {
            params: options?.queries,
            signal: options?.signal?.signal,
            headers,
        });

        return response.data;
    }
}
