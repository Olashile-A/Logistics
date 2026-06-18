import { create } from "zustand";
import { Delivery, DeliveryStatus, CurrentUser, FilterState } from "@/lib/types";

interface DispatchStoreState {
  filters: FilterState;
  selectedDelivery: Delivery | null;
  isModalOpen: boolean;
  currentUser: CurrentUser;

  // Actions
  setStatusFilter: (status: DeliveryStatus | null) => void;
  setSearchQuery: (query: string) => void;
  selectDelivery: (delivery: Delivery | null) => void;
  toggleModal: (open?: boolean) => void;
  setCurrentUser: (user: CurrentUser) => void;
}

export const useDispatchStore = create<DispatchStoreState>((set) => ({
  filters: {
    status: null,
    searchQuery: "",
  },
  selectedDelivery: null,
  isModalOpen: false,
  currentUser: {
    id: "user-1",
    name: "John Manager",
    role: "admin",
  },

  setStatusFilter: (status) =>
    set((state) => ({
      filters: { ...state.filters, status },
    })),

  setSearchQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
    })),

  selectDelivery: (delivery) =>
    set(() => ({
      selectedDelivery: delivery,
    })),

  toggleModal: (open) =>
    set((state) => ({
      isModalOpen: open !== undefined ? open : !state.isModalOpen,
    })),

  setCurrentUser: (user) =>
    set(() => ({
      currentUser: user,
    })),
}));
