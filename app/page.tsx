"use client";

import { useEffect, useState } from "react";
import { useDispatchStore } from "@/lib/store/dispatchStore";
import { useInfiniteDeliveries } from "@/lib/hooks/useInfiniteDeliveries";
import { DashboardLayout } from "@/components/dashboard-layout";
import { FilterBar } from "@/components/filter-bar";
import { DeliveryGrid } from "@/components/delivery-grid";
import { InterventionModal } from "@/components/intervention-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useDeliveryStore } from "@/lib/store/deliveryStore";
import { startSimulator, stopSimulator } from "@/lib/services/simulatorServive";

export default function Page() {
  const { filters } = useDispatchStore();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteDeliveries(
    filters.status,
    filters.searchQuery,
  );

  // const deliveries =
  //   data?.pages.flatMap((page) => page.data) ?? [];

   const deliveries = useDeliveryStore((s) => s.deliveries);
   

  useEffect(() => {
    startSimulator();

    return () => stopSimulator();
  }, []);


  return (
    <DashboardLayout deliveries={deliveries}>
      <FilterBar />

      <DeliveryGrid
        deliveries={deliveries}
        // isLoading={isLoading}
        // error={error}
        // hasNextPage={hasNextPage}
        // isFetchingNextPage={isFetchingNextPage}
        // onLoadMore={fetchNextPage}
      />

      <InterventionModal />
    </DashboardLayout>
    
  );
}
