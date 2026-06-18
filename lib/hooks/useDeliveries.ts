import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Delivery, DeliveryStatus } from "@/lib/types";

interface DeliveriesResponse {
  success: boolean;
  data: Delivery[];
  count: number;
}

export function useDeliveries(
  status: DeliveryStatus | null = null,
  searchQuery: string = ""
): UseQueryResult<Delivery[], Error> {
  return useQuery({
    queryKey: ["deliveries", status, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/deliveries?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch deliveries");
      }

      const json: DeliveriesResponse = await response.json();
      return json.data;
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
