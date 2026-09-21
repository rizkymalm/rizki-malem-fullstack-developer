import { createAsyncThunk } from '@reduxjs/toolkit';

import { listUser } from '../../services/user.service';

interface PropList {
    queries: {
        page?: number;
        limit?: number;
    };
}
export const getUserList = createAsyncThunk(
    'user/getAll',
    async ({ queries }: PropList, { rejectWithValue }) => {
        try {
            return await listUser(queries);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
