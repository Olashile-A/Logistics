import { create } from "zustand";
import { Delivery } from "../types";
import { generateMockDeliveries } from "../services/mockDataService";

type DeliveryStore = {
  deliveries: Delivery[];
  setDeliveries: (data: Delivery[]) => void;
  updateDelivery: (id: string, updates: Partial<Delivery>) => void;
  reset: () => void;
};

const generate = (): Delivery[] => generateMockDeliveries();

export const useDeliveryStore = create<DeliveryStore>((set, get) => ({
  deliveries: generate(),

  setDeliveries: (data) => set({ deliveries: data }),

  updateDelivery: (id, updates) =>
    set((state) => ({
      deliveries: state.deliveries.map((d) =>
        d.id === id
          ? {
              ...d,
              ...updates,
              lastUpdated: new Date().toISOString(),
            }
          : d
      ),
    })),

  reset: () => set({ deliveries: generate() }),
}));