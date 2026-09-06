import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0098487&lng=72.5198293&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch restaurant data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
