import axios from 'axios';
import Cookies from 'js-cookie';
import useTransactionStore from '../store/transaction';


interface TransactionParams {
    page?: number;
    limit?: number;
    user_id?: string;
    transaction_type: string | null;
    from: string | null;
    to: string | null;
  }

export const useTransactionReport = async (params: TransactionParams) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:3000/api/v1/transactions/report', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ...params}
        });

        useTransactionStore.getState().setSeries(response.data.series);

        // console.log(response.data)
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const useTransactionLog = async (params: TransactionParams) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:3000/api/v1/transactions/log', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ...params}
        });

        useTransactionStore.getState().setLog(response.data.data);
        useTransactionStore.getState().setTotalLogPage(response.data.total_pages);

        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}