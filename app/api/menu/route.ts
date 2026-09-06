import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resId = searchParams.get("resId");

  if (!resId) {
    return NextResponse.json(
      { error: "Missing resId parameter" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.0098487&lng=72.5198293&restaurantId=${resId}`,
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
        { error: "Failed to fetch menu data" },
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
