import { create } from "zustand";

interface TransactionState {
    series: any[] | null;
    log: any[] | null;
    logPage: number;
    totalLogPage: number;
    setSeries: (series: any[]) => void;
    setLog: (log: any[]) => void;
    setLogPage: (page: number) => void;
    nextLogPage: () => void;
    prevLogPage: () => void;
    setTotalLogPage: (total: number) => void;
}

const useTransactionStore = create<TransactionState>((set) => ({
    series: null,
    log: [],
    logPage: 1,
    totalLogPage: 1,
    setSeries: (series) => set(() => ({ series })),
    setLog: (log) => set(() => ({ log })),
    setLogPage: (page: number) => set(() => ({ logPage: page })),
    setTotalLogPage: (total) => set(() => ({ totalLogPage: total })),
    nextLogPage: () => set((state) =>({ logPage: state.logPage + 1 })),
    prevLogPage: () => set((state) =>({ logPage: state.logPage - 1 }))

}));

export default useTransactionStore;