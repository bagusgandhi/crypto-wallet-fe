import { create } from "zustand";

interface DashboardState {
    collapsed: boolean;
    showDetail: boolean;
    selectedMenu: string;
    detailKey: string | null;
    setCollapsed: () => void;
    setshowDetail: (show: boolean) => void;
    setSelectedMenu: (selected: string) => void;
    setDetailKey: (detailKey: string | null) => void;

}

export const useDashboardStore = create<DashboardState>((set) => ({
    collapsed: false,
    showDetail: false,
    detailKey: null,
    selectedMenu: "dashboard",
    setCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
    setshowDetail: (show) => set((state) => ({ showDetail: show })),
    setSelectedMenu: (selected) => set(() => ({ selectedMenu: selected })),
    setDetailKey: (key) => set(() => ({ detailKey: key }))

}));
