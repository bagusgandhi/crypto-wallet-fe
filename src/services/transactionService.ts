import axios from 'axios';
import Cookies from 'js-cookie';
import useTransactionStore from '../store/transaction';


interface TransactionParams {
    page?: number;
    limit?: number;
    user_id?: string;
    transaction_type?: string | null;
    from?: string | null;
    to?: string | null;
}

export const useTransactionReport = async (params: TransactionParams) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}transactions/report`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { ...params }
        });

        useTransactionStore.getState().setSeries(response.data.series);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const useTransactionReportByUser = async (params: TransactionParams) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}transactions/report`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { ...params }
        });

        useTransactionStore.getState().setSeriesByUser(response.data.series);

        return response.data;
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

        useTransactionStore.getState().setLog(response.data.data);
        useTransactionStore.getState().setTotalLogPage(response.data.total_pages);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const useTransactionLogByUser = async (params: TransactionParams) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}transactions/log`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { ...params }
        });

        useTransactionStore.getState().setLogByUser(response.data.data);

        useTransactionStore.getState().setTotalLogPageByUser(response.data.total_pages);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}