"use client";

import { useDispatchStore } from "@/lib/store/dispatchStore";
import { X, AlertCircle } from "lucide-react";
import { formatDateTime, timeUntilETA } from "@/lib/utils/dateUtils";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

export function InterventionModal() {
  const { selectedDelivery, isModalOpen, toggleModal } = useDispatchStore();
  const queryClient = useQueryClient();

  if (!isModalOpen || !selectedDelivery) return null;

  const isException =
    selectedDelivery.status === "Delayed" ||
    selectedDelivery.status === "On Hold" ||
    selectedDelivery.status === "Returned to Sender";

  const handleReassignDriver = () => {
    const drivers = [
      "John Martinez",
      "Sarah Chen",
      "Mike Anderson",
      "Lisa Thompson",
    ];
    const newDriver = drivers[Math.floor(Math.random() * drivers.length)];

    queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    toast.success(`Driver reassigned to ${newDriver}`);
  };

  const handleResolveException = () => {
    toast.success("Exception resolved - delivery on track");
  };

  const handleReroute = () => {
    const destinations = [
      "New York, NY",
      "Los Angeles, CA",
      "Chicago, IL",
      "Houston, TX",
      "Phoenix, AZ",
    ];
    const currentIndex = destinations.indexOf(selectedDelivery.destination);
    const newDestination =
      destinations[(currentIndex + 1) % destinations.length];


    queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    toast.success(`Delivery rerouted to ${newDestination}`);
  };

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            {isException && <AlertCircle className="w-5 h-5 text-amber-600" />}
            <h2 className="text-xl font-bold text-slate-900">
              Delivery Details
            </h2>
          </div>
         <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-slate-500" />
        </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                Delivery ID
              </p>
              <p className="text-lg font-mono font-bold text-slate-900">
                {selectedDelivery.trackingNumber}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                Weight
              </p>
              <p className="text-lg font-bold text-slate-900">
                {selectedDelivery.weight} lbs
              </p>
            </div>
          </div>

          {/* Route Information */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
              Route
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {selectedDelivery.origin}
                </p>
                <p className="text-xs text-slate-600">Origin</p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="w-8 h-0.5 bg-blue-300"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {selectedDelivery.destination}
                </p>
                <p className="text-xs text-slate-600">Destination</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                Client Name
              </p>
              <p className="text-sm font-medium text-slate-900">
                {selectedDelivery.clientName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                Driver Name
              </p>
              <p className="text-sm font-medium text-slate-900">
                {selectedDelivery.driverName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                ETA
              </p>
              <p className="text-sm font-medium text-slate-900">
                {formatDateTime(selectedDelivery.eta)}
              </p>
              <p className="text-xs text-slate-600">
                {timeUntilETA(selectedDelivery.eta)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-600 uppercase mb-1">
                Last Updated
              </p>
              <p className="text-sm font-medium text-slate-900">
                {formatDateTime(selectedDelivery.lastUpdated)}
              </p>
            </div>
          </div>

          {/* Actions - Only for Admin */}
          {isException && (
            <div className="border-t border-slate-200 pt-6">
              <p className="text-sm font-semibold text-slate-900 mb-4">
                Exception Actions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button size="sm" variant="default" onClick={handleResolveException}>
                  Resolve Exception
                </Button>

                <Button size="sm" variant="default" onClick={handleReassignDriver}>
                  Reassign Driver
                </Button>

                <Button size="sm" variant="default" onClick={handleReroute}>
                  Reroute Delivery
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
