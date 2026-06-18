export type DeliveryStatus =
  | "Pending"
  | "Loaded"
  | "Departed from Warehouse"
  | "In Transit"
  | "Out for Delivery"
  | "Arrived at Hub"
  | "Customs Clearance"
  | "Delayed"
  | "On Hold"
  | "Unloaded"
  | "Returned to Sender"
  | "Delivered";

export interface Delivery {
  id: string;
  clientName: string;
  driverName: string;
  trackingNumber: string;
  status: DeliveryStatus;
  eta: string;
  origin: string;
  destination: string;
  weight: number;
  lastUpdated: string;
}

export type UserRole = "admin" | "viewer";

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
}

export interface FilterState {
  status: DeliveryStatus | null;
  searchQuery: string;
}
