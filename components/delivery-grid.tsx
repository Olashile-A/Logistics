"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Delivery } from "@/lib/types";
import { DeliveryRow } from "./delivery-row";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";

interface DeliveryGridProps {
  deliveries?: Delivery[];
  isLoading?: boolean;
  error?: Error | null;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
}

const EXCEPTION_STATUSES = [
  "Delayed",
  "On Hold",
  "Returned to Sender",
];

export function DeliveryGrid({
  deliveries,
  isLoading,
  error,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: DeliveryGridProps) {
  const loadMoreRef = useRef(null);

  // const sortedDeliveries = useMemo(() => {
  //   return [...deliveries].sort((a, b) => {
  //     const aIsException = EXCEPTION_STATUSES.includes(a.status);
  //     const bIsException = EXCEPTION_STATUSES.includes(b.status);

  //     if (aIsException !== bIsException) {
  //       return aIsException ? -1 : 1;
  //     }
  //     return 0;
  //   });
  // }, [deliveries]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        onLoadMore?.();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, onLoadMore]);

  // ERROR STATE
  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-600 bg-red-50 rounded-lg">
        {error.message}
      </div>
    );
  }

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-50 rounded-lg">
        <Loader className="w-8 h-8 animate-spin text-slate-400" />
        <p className="mt-3 text-sm text-slate-800">Loading deliveries...</p>
      </div>
    );
  }

  // EMPTY STATE
  if (!deliveries?.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg text-slate-600">
        No deliveries found
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-slate-200 rounded-lg bg-white overflow-hidden flex-1">

      {/* HEADER */}
      <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-3 border-b font-semibold text-sm text-slate-700 sticky top-0 bg-white z-10">
        <div className="col-span-2">Delivery ID</div>
        <div className="col-span-2">Client Name</div>
        <div className="col-span-2">Driver Name</div>
        <div className="col-span-2">Route</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">ETA</div>
      </div>

      {/* ROWS */}
      <div className="flex-1 overflow-y-auto">
        {deliveries.map((delivery) => {
          const isException =
            EXCEPTION_STATUSES.includes(delivery.status);

          return (
            <DeliveryRow
              key={delivery.id}
              delivery={delivery}
              isException={isException}
            />
          );
        })}

        {
          isFetchingNextPage && 
          <div className="flex flex-col items-center justify-center h-20 bg-slate-50 rounded-lg">
            <Loader className="w-8 h-8 animate-spin text-slate-400" />
            <p className="mt-3 text-sm text-slate-800">Loading more...</p>
          </div>
        }
      

        {/* LOAD MORE
        {hasNextPage && (
          <div className="flex justify-center py-4 border-t">
            ertyuiuytrewertywuiw
            <Button size="sm" variant="default"    
              onClick={onLoadMore}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading..."
                : "Load More"}
            </Button>
          </div>
        )} */}
      <div ref={loadMoreRef} className="h-10" />
      </div>

    </div>
  );
}