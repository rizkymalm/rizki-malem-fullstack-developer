import type { ApiError, ApiResponse } from '../types';

export interface UserState {
    list: {
        loading: boolean;
        error: ApiError | null;
        data: ApiResponse;
    };
}
