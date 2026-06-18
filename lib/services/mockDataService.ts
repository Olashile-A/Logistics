import { Delivery, DeliveryStatus } from "@/lib/types";

// US Cities for realistic routes
const CITIES = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Denver, CO",
  "Boston, MA",
  "Seattle, WA",
  "Miami, FL",
  "Atlanta, GA",
  "Detroit, MI",
  "Minneapolis, MN",
  "Portland, OR",
  "Las Vegas, NV",
];

// First and last names for realistic names
const FIRST_NAMES = [
  "James", "Mary", "Robert", "Patricia", "Michael", "Jennifer", "William", "Linda",
  "David", "Barbara", "Richard", "Susan", "John", "Jessica", "Thomas", "Sarah",
  "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Betty", "Matthew", "Margaret",
  "Mark", "Sandra", "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily",
  "Andrew", "Donna", "Joshua", "Michelle", "Kenneth", "Carol", "Kevin", "Amanda",
  "Brian", "Melissa", "George", "Deborah", "Edward", "Stephanie", "Ronald", "Rebecca",
  "Timothy", "Sharon", "Jason", "Laura", "Jeffrey", "Cynthia", "Ryan", "Kathleen",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Young",
  "Walker", "Allen", "King", "Wright", "Scott", "Torres", "Peterson", "Phillips",
  "Campbell", "Parker", "Evans", "Edwards", "Collins", "Reyes", "Stewart", "Morris",
];

const DELIVERY_STATUSES: DeliveryStatus[] = [
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

/**
 * Generates 500 realistic mock delivery records
 */
export function generateMockDeliveries(): Delivery[] {
  const deliveries: Delivery[] = [];

  for (let i = 1; i <= 500; i++) {
    const clientFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const clientLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const driverFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const driverLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

    const origin = CITIES[Math.floor(Math.random() * CITIES.length)];
    let destination = CITIES[Math.floor(Math.random() * CITIES.length)];
    
    // Ensure destination is different from origin
    while (destination === origin) {
      destination = CITIES[Math.floor(Math.random() * CITIES.length)];
    }

    const status = DELIVERY_STATUSES[Math.floor(Math.random() * DELIVERY_STATUSES.length)];
    
    // Generate realistic ETA (1-30 days from now)
    const etaDate = new Date();
    etaDate.setDate(etaDate.getDate() + Math.floor(Math.random() * 30) + 1);

    // Generate lastUpdated (1-5 days ago)
    const lastUpdatedDate = new Date();
    lastUpdatedDate.setDate(lastUpdatedDate.getDate() - Math.floor(Math.random() * 5) - 1);

    deliveries.push({
      id: String(i),
      clientName: `${clientFirstName} ${clientLastName}`,
      driverName: `${driverFirstName} ${driverLastName}`,
      trackingNumber: `TRK${String(Math.floor(Math.random() * 1000000)).padStart(6, "0")}`,
      status,
      eta: etaDate.toISOString(),
      origin,
      destination,
      weight: parseFloat((Math.random() * 50 + 0.5).toFixed(1)),
      lastUpdated: lastUpdatedDate.toISOString(),
    });
  }

  return deliveries;
}

class MockDataService {
  private deliveries: Delivery[] = generateMockDeliveries();

  getAllDeliveries(): Delivery[] {
    return this.deliveries;
  }

  filterDeliveries(
    status: DeliveryStatus | null,
    search?: string
  ): Delivery[] {
    let filtered = [...this.deliveries];

    if (status) {
      filtered = filtered.filter(
        (delivery) => delivery.status === status
      );
    }

    if (search) {
      const query = search.toLowerCase();

      filtered = filtered.filter(
        (delivery) =>
          delivery.trackingNumber.toLowerCase().includes(query) ||
          delivery.clientName.toLowerCase().includes(query) ||
          delivery.driverName.toLowerCase().includes(query) ||
          delivery.origin.toLowerCase().includes(query) ||
          delivery.destination.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  getDeliveryById(id: string): Delivery | undefined {
    return this.deliveries.find(
      (delivery) => delivery.id === id
    );
  }

  updateDelivery(
    id: string,
    updates: Partial<Delivery>
  ): Delivery | undefined {
    const delivery = this.getDeliveryById(id);

    if (!delivery) return undefined;

    Object.assign(delivery, updates);

    delivery.lastUpdated = new Date().toISOString();

    return delivery;
  }

  getCountByStatus(status: DeliveryStatus): number {
    return this.deliveries.filter(
      (delivery) => delivery.status === status
    ).length;
  }

  updateDeliveryStatus(
    status: DeliveryStatus
  ): Delivery[] {
    return this.deliveries.filter(
      (delivery) => delivery.status === status
    );
  }
}

export const mockDataService = new MockDataService();