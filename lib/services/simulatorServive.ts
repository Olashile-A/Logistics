import { DeliveryStatus } from "../types";
import { useDeliveryStore } from "../store/deliveryStore";

let intervalId: NodeJS.Timeout | null = null;

export function startSimulator() {
  if (intervalId) return; // prevent multiple intervals

  intervalId = setInterval(() => {
    const { deliveries, updateDelivery } =
      useDeliveryStore.getState();

    if (!deliveries.length) return;

    const count = Math.floor(Math.random() * 3) + 1;

    const STATUSES: DeliveryStatus[] = [
      "Pending",
      "In Transit",
      "Delivered",
      "Delayed",
      "On Hold",
    ];

    for (let i = 0; i < count; i++) {
      const delivery = deliveries[i];
      if (!delivery) continue;

      const currentIndex = STATUSES.indexOf(delivery.status);

      const newStatus =
        Math.random() > 0.3 && currentIndex < STATUSES.length - 1
          ? STATUSES[currentIndex + 1]
          : ["Delayed", "On Hold"][
              Math.floor(Math.random() * 2)
            ];

      updateDelivery(delivery.id, {
        status: newStatus as DeliveryStatus,
      });
    }
  }, 5000);
}

export function stopSimulator() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}