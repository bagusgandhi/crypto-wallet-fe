import axios from 'axios';
import Cookies from 'js-cookie';

interface TransactionParams {
    page?: number;
    limit?: number;
    user_id?: string;
    transaction_type?: string | null;
    from?: string | null;
    to?: string | null;
    cursor?: string | null;
}

export const useTransactionReport = async (params: TransactionParams) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}transactions/report`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { ...params }
        });

        const series =  response.data.series;

        return series;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const useTransactionLog = async (params: TransactionParams) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}transactions/log`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { ...params }
        });

        const data = response.data.data;

        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
