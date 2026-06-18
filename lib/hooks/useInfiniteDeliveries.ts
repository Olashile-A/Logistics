import { useInfiniteQuery } from "@tanstack/react-query";
import { Delivery, DeliveryStatus } from "@/lib/types";

export interface PaginatedResponse {
  success: boolean;
  data: Delivery[];
  count: number;
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}


export function useInfiniteDeliveries(
  status: DeliveryStatus | null = null,
  searchQuery = "",
  pageSize = 20
) {
  return useInfiniteQuery({
    queryKey: ["deliveries", status, searchQuery, pageSize],

    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams();

      if (status) params.append("status", status);

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      params.append("offset", String(pageParam));
      params.append("limit", String(pageSize));

      const response = await fetch(
        `/api/deliveries?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch deliveries");
      }

      return response.json() as Promise<PaginatedResponse>;
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      const { offset, limit, hasMore } = lastPage;

      if (!hasMore) return undefined;

      return offset + limit;
    },

    staleTime: 30_000,
  });
}
