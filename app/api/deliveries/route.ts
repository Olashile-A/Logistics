import { NextRequest, NextResponse } from "next/server";
import { Delivery, DeliveryStatus } from "@/lib/types";
import { mockDataService } from "@/lib/services/mockDataService";

// Use environment variable for API endpoint, with a default placeholder
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || '';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") as DeliveryStatus | null;
    const search = searchParams.get("search") as string | null;
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "25");

    let deliveries: any[] = [];
    let fromMockData = false;

    try {
      // Fetch deliveries from the real API
      
      const response = await fetch(`${API_ENDPOINT}/v1/deliveries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      deliveries = await response.json();

      // Handle both array response and wrapped object response
      if (!Array.isArray(deliveries)) {
        deliveries = deliveries || [];
      }
    } catch (apiError) {
      console.warn("External API failed, using mock data:", apiError);
      // Fallback to mock data if external API fails
      deliveries = mockDataService.getAllDeliveries();
      
      fromMockData = true;
    }

    // Filter by status
    if (status) {
      deliveries = deliveries.filter((d: any) => d.status === status);
    }

    // Filter by search query across multiple fields
    if (search) {
      const query = search.toLowerCase();
      deliveries = deliveries.filter(
        (d: any) =>
          (d.trackingNumber && d.trackingNumber.toLowerCase().includes(query)) ||
          (d.clientName && d.clientName.toLowerCase().includes(query)) ||
          (d.driverName && d.driverName.toLowerCase().includes(query)) ||
          (d.origin && d.origin.toLowerCase().includes(query)) ||
          (d.destination && d.destination.toLowerCase().includes(query))
      );
    }

    const totalCount = deliveries.length;
    const paginatedDeliveries = deliveries.slice(offset, offset + limit);
    const hasMore = offset + limit < totalCount;

    return NextResponse.json({
      success: true,
      data: paginatedDeliveries,
      total: totalCount,
      offset,
      limit,
      hasMore,
    });
  } catch (error) {
    console.error("Unexpected error in deliveries endpoint:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch deliveries",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
