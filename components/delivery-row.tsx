"use client";

import { memo } from "react";
import { Delivery } from "@/lib/types";
import { useDispatchStore } from "@/lib/store/dispatchStore";
import { StatusBadge } from "./status-badge";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils/dateUtils";
import { Button } from "./ui/button";

interface DeliveryRowProps {
  delivery: Delivery;
  isException: boolean;
}

function DeliveryRowComponent({ delivery, isException }: DeliveryRowProps) {
  const { selectDelivery, toggleModal, currentUser } = useDispatchStore();

  const handleRowClick = () => {
    selectDelivery(delivery);
    toggleModal(true);
  };

  return (
    <div
      className={`hidden md:grid grid-cols-12 gap-3 px-4 py-3 border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer items-center ${
        isException ? "bg-amber-50" : ""
      }`}
      onClick={handleRowClick}
    >
      {/* Tracking Number - col-span-2 */}
      <div className="col-span-2 min-w-0">
        <p className="font-mono font-semibold text-sm text-slate-900 truncate">
          {delivery.trackingNumber}
        </p>
      </div>

      {/* Client Name - col-span-2 */}
      <div className="col-span-2 min-w-0">
        <p className="text-sm text-slate-700 truncate">{delivery.clientName}</p>
      </div>

         {/* Client Name - col-span-2 */}
      <div className="col-span-2 min-w-0">
        <p className="text-sm text-slate-700 truncate">{delivery.driverName}</p>
      </div>

      {/* Origin -> Destination - col-span-3 */}
      <div className="col-span-2 flex items-center gap-2 min-w-0">
        <span className="text-xs text-slate-600 truncate">{delivery.origin}</span>
        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span className="text-xs text-slate-600 truncate">{delivery.destination}</span>
      </div>

      {/* Status Badge - col-span-2 */}
      <div className="col-span-2 flex justify-start">
        <StatusBadge status={delivery.status} />
      </div>

      {/* ETA - col-span-3 (includes action button) */}
      <div className="col-span-2 flex items-center justify-between gap-2">
        <p className="text-xs text-slate-600">{formatDate(delivery.eta)}</p>

        {/* Action Button - Admin only */}
        {currentUser.role === "admin" && isException && (
        <Button
          size="sm"
          variant="default"
          onClick={(e) => {
            e.stopPropagation();
            handleRowClick();
          }}
          className="flex-shrink-0 whitespace-nowrap bg-amber-500 text-xs text-white hover:bg-amber-600"
        >
          Intervene
        </Button>
        )}
      </div>
    </div>
  );
}

export const DeliveryRow = memo(DeliveryRowComponent);
