import dayjs from "dayjs";
import { create } from "zustand";

interface TransactionState {
    // chart series
    series: any[] | null;
    setSeries: (series: any[]) => void;

    // tabel log transaction 
    log: any[] | null;
    setLog: (log: any[]) => void;

    // table log pagination
    logPage: number;
    totalLogPage: number;
    setLogPage: (page: number) => void;
    nextLogPage: () => void;
    prevLogPage: () => void;
    setTotalLogPage: (total: number) => void;

    // filter date picker
    date: string | null;
    setDate: (dates: any) => void;

    // filter transaction type
    transactionType: string | null;
    setTransactionType: (type: string | null) => void;

}

const useTransactionStore = create<TransactionState>((set) => ({
    // chart series
    series: null,
    setSeries: (series) => set(() => ({ series })),

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

    // filter date picker
    date: null,
    setDate: (dates: any) => set({
        date: dates ? dates.map((date: string | number | Date | dayjs.Dayjs | null | undefined) => dayjs(date).format("YYYY-MM-DD")).join('_') : null,
    }),

    // filter transaction type
    transactionType: null,
    setTransactionType: (type) => set(() => ({ transactionType: type  })),

}));

export default useTransactionStore;