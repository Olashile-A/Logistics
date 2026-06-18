"use client";

import { useDispatchStore } from "@/lib/store/dispatchStore";
import { DeliveryStatus } from "@/lib/types";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";

const STATUSES: DeliveryStatus[] = [
  "Pending",
  "Loaded",
  "Departed from Warehouse",
  "In Transit",
  "Out for Delivery",
  "Arrived at Hub",
  "Customs Clearance",
  "Delayed",
  "On Hold",
  "Unloaded",
  "Returned to Sender",
  "Delivered",
];

export function FilterBar() {
  const { filters, setStatusFilter, setSearchQuery } = useDispatchStore();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 p-4 bg-white border-b border-slate-200">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by tracking, client, driver..."
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border text-slate-800 border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="status-filter" className="text-sm font-medium text-slate-700 whitespace-nowrap">
          Status:
        </label>
        <select
          id="status-filter"
          value={filters.status || ""}
          onChange={(e) => setStatusFilter(e.target.value ? (e.target.value as DeliveryStatus) : null)}
          className="px-3 py-2 border text-slate-800 border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm bg-white"
        >
          <option value="" >All Statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {(filters.status || filters.searchQuery) && (
       <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setStatusFilter(null);
            setSearchQuery("");
          }}
          title="Clear filters"
          className="flex items-center gap-2 text-slate-700"
        >
          <X className="w-4 h-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
