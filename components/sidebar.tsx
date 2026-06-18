"use client";

import { useDispatchStore } from "@/lib/store/dispatchStore";
import {
  Menu,
  X,
  Truck,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface SidebarProps {
  stats: {
    total: number;
    exceptions: number;
    delivered: number;
    inTransit: number;
  };
}

export function Sidebar({ stats }: SidebarProps) {
  const { filters, setStatusFilter } = useDispatchStore();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: SidebarItem[] = [
    {
      id: "all",
      label: "All Deliveries",
      icon: <Truck className="w-5 h-5" />,
      color: "text-blue-600",
    },
  ];

  const EXCEPTION_STATUSES = ["Delayed", "On Hold", "Returned to Sender"];

  const handleMenuClick = (id: string) => {
    if (id === "all") {
      setStatusFilter(null);
    } else if (id === "Exception") {
      setStatusFilter("Delayed" as any);
    } else {
      setStatusFilter(id as any);
    }
    setIsOpen(false);
  };

  const currentFilter = filters.status 
    ? (EXCEPTION_STATUSES.includes(filters.status) ? "Exception" : filters.status)
    : "all";
  const currentLabel =
    menuItems.find((item) => item.id === currentFilter)?.label || "All Deliveries";

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed bottom-4 left-4 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
          className="rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Logistics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {currentLabel}
          </p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentFilter === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-between px-4 py-3 ${
                  isActive
                    ? "bg-blue-50 border border-blue-300 text-blue-900"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={item.color}>{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>

              </Button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-slate-200">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
              Quick Stats
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-semibold">
                  {stats.total - stats.delivered - stats.inTransit}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-semibold">
                  {Math.round((stats.delivered / Math.max(stats.total, 1)) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
