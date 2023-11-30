import dayjs from "dayjs";
import { create } from "zustand";

interface TransactionDetailUser {
    transaction_id: string;
    amount: number;
    timestamp: string;
    transaction_type: string;
    transaction_detail: Record<string, string>;
    username: string;
    user_id: string;
    full_name: string;
}

interface TransactionState {
    // chart series
    series: any[] | null;
    setSeries: (seriesByUser: any[]) => void;

    // chart series by user
    seriesByUser: any[] | null;
    setSeriesByUser: (series: any[]) => void;

    // tabel log transaction 
    log: any[] | null;
    setLog: (log: any[]) => void;

    // tabel log by user
    logByUser: any[] | null;
    setLogByUser: (logByUser: any[]) => void;

    // table log pagination
    logPage: number;
    totalLogPage: number;
    setLogPage: (page: number) => void;
    nextLogPage: () => void;
    prevLogPage: () => void;
    setTotalLogPage: (total: number) => void;

    // table log paginationby user
    logPageByUser: number;
    totalLogPageByUser: number;
    setLogPageByUser: (page: number) => void;
    nextLogPageByUser: () => void;
    prevLogPageByUser: () => void;
    setTotalLogPageByUser: (total: number) => void;

    // filter date picker
    date: string | null;
    setDate: (dates: any) => void;

    // filter transaction type
    transactionType: string | null;
    setTransactionType: (type: string | null) => void;

    // filter date picker
    dateByUser: string | null;
    setDateByUser: (dates: any) => void;

    // filter transaction type
    transactionTypeByUser: string | null;
    setTransactionTypeByUser: (type: string | null) => void;

    // user detail
    transactionDetailUser: TransactionDetailUser | null;
    setTransactionDetailUser: (detail: TransactionDetailUser | null) => void;

    // loading
    logByUserLoading: boolean;
    setLogByUserLoading: (loading: boolean) => void;
}

const useTransactionStore = create<TransactionState>((set) => ({
    // chart series
    series: null,
    setSeries: (series) => set(() => ({ series })),

    // chart series
    seriesByUser: null,
    setSeriesByUser: (seriesByUser) => set(() => ({ seriesByUser })),

    // tabel log transaction 
    log: [],
    setLog: (log) => set(() => ({ log })),

    // table log pagination
    logPage: 1,
    totalLogPage: 1,
    setLogPage: (page: number) => set(() => ({ logPage: page })),
    setTotalLogPage: (total) => set(() => ({ totalLogPage: total })),
    nextLogPage: () => set((state) => ({ logPage: state.logPage + 1 })),
    prevLogPage: () => set((state) => ({ logPage: state.logPage - 1 })),

    // table log pagination by  user
    logPageByUser: 1,
    totalLogPageByUser: 1,
    setLogPageByUser: (page: number) => set(() => ({ logPageByUser: page })),
    setTotalLogPageByUser: (total) => set(() => ({ totalLogPage: total })),
    nextLogPageByUser: () => set((state) => ({ logPageByUser: state.logPageByUser + 1 })),
    prevLogPageByUser: () => set((state) => ({ logPageByUser: state.logPageByUser - 1 })),

    // filter date picker
    date: null,
    setDate: (dates: any) => set({
        date: dates ? dates.map((date: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(date).format("YYYY-MM-DD")).join('_') : null,
    }),

    // filter transaction type
    transactionType: null,
    setTransactionType: (type) => set(() => ({ transactionType: type })),

    // filter date picker by user detail
    dateByUser: null,
    setDateByUser: (dates: any) => set({
        dateByUser: dates ? dates.map((date: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(date).format("YYYY-MM-DD")).join('_') : null,
    }),

    // filter transaction type by user detail
    transactionTypeByUser: null,
    setTransactionTypeByUser: (type) => set(() => ({ transactionTypeByUser: type })),

    // user detail
    transactionDetailUser: null,
    setTransactionDetailUser: (detail) => set(() => ({ transactionDetailUser: detail })),

    logByUser: [],
    setLogByUser: (logByUser) => set(() => ({ logByUser })),

    logByUserLoading: true,
    setLogByUserLoading: (loading) => set(() => ({ logByUserLoading: loading })),

}));

export default useTransactionStore;