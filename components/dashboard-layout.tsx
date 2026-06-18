"use client";

import { useDispatchStore } from "@/lib/store/dispatchStore";
import { Truck, AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { Delivery } from "@/lib/types";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  deliveries: Delivery[];
  children: React.ReactNode;
}

const EXCEPTION_STATUSES = ["Delayed", "On Hold", "Returned to Sender"];

export function DashboardLayout({
  deliveries,
  children,
}: DashboardLayoutProps) {
  const { currentUser } = useDispatchStore();

  const stats = useMemo(() => {
    const total = deliveries.length;
    const exceptions = deliveries.filter((d) =>
      EXCEPTION_STATUSES.includes(d.status)
    ).length;
    const delivered = deliveries.filter((d) => d.status === "Delivered").length;
    const inTransit = deliveries.filter(
      (d) =>
        d.status === "In Transit" ||
        d.status === "Out for Delivery" ||
        d.status === "Departed from Warehouse"
    ).length;

    return { total, exceptions, delivered, inTransit };
  }, [deliveries]);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar stats={stats} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow border-b border-slate-200">
          <div className="max-w-screen mx-4 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Title and Logo */}
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Live Dispatch Dashboard
                  </h1>
                  <p className="text-sm text-slate-600">Real-time delivery tracking</p>
                </div>
              </div>

              {/* User Info */}
              <div className="bg-slate-100 px-4 py-2 rounded-lg">
                <p className="text-xs font-semibold text-slate-600 uppercase">
                  Current User
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {currentUser.name}
                </p>
                <p className="text-xs text-slate-600 capitalize">{currentUser.role}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className=" rounded-lg p-4 border border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                  Total Deliveries
                </p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <div className=" rounded-lg p-4 border border-emerald-200">
                <p className="text-xs font-semibold text-emerald-600 uppercase mb-1">
                  Delivered
                </p>
                <p className="text-2xl font-bold text-emerald-900">
                  {stats.delivered}
                </p>
              </div>
              <div className=" rounded-lg p-4 border border-purple-200">
                <p className="text-xs font-semibold text-purple-600 uppercase mb-1">
                  In Transit
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {stats.inTransit}
                </p>
              </div>
              <div className=" rounded-lg p-4 border border-amber-200">
                <p className="text-xs font-semibold text-amber-600 uppercase mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Exceptions
                </p>
                <p className="text-2xl font-bold text-amber-900">
                  {stats.exceptions}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col mx-4 px-4 sm:px-6 lg:px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
