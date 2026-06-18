"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactNode, useRef } from "react";

// Create queryClient outside of component to persist across renders
const queryClientRef = { current: null as QueryClient | null };

function getQueryClient() {
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
          gcTime: 5 * 60 * 1000,
        },
      },
    });
  }
  return queryClientRef.current;
}

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = useRef(getQueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  );
}
