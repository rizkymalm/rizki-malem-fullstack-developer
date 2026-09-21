import Api from '../utils/api';

const baseUrl: Api = new Api({
    baseUrl: import.meta.env.VITE_API_URL as string,
    xApiKey: 'secretkey-123',
});

export const listUser = async (queries: Record<string, string | number>) => {
    const response = await baseUrl.get('/user', {
        queries,
    });
    return response;
};
