import { DeliveryStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: DeliveryStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Out for Delivery":
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delayed":
      case "On Hold":
      case "Returned to Sender":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Pending":
      case "Loaded":
      case "Departed from Warehouse":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "Arrived at Hub":
      case "Unloaded":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Customs Clearance":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}
