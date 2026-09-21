import { createSlice } from '@reduxjs/toolkit';

import { getUserList } from './user.thunks';
import type { UserState } from './user.types';

const initialState: UserState = {
    list: {
        loading: false,
        data: null,
        error: null,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userReset: state => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUserList.pending, (state: UserState) => {
                state.list.loading = true;
                state.list.error = null;
            })
            .addCase(getUserList.fulfilled, (state: UserState, action) => {
                state.list.loading = false;
                state.list.data = action.payload;
                state.list.error = null;
            })
            .addCase(getUserList.rejected, (state: UserState, action) => {
                state.list.error = action.payload;
                state.list.loading = false;
            });
    },
});

export const { userReset } = userSlice.actions;
export default userSlice.reducer;
