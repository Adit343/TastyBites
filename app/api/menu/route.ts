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
    const userAgent =
      request.headers.get("user-agent") ||
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

    const res = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.0098487&lng=72.5198293&submitAction=ENTER&restaurantId=${resId}`,
      {
        headers: {
          "User-Agent": userAgent,
          "Accept": "application/json, text/plain, */*",
          "Referer": "https://www.swiggy.com/",
        },
      }
    );

    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().startsWith("{")) {
        const json = JSON.parse(text);
        if (json?.data?.cards) {
          return NextResponse.json(json);
        }
      }
    }
  } catch (error) {
    console.error("Swiggy menu fetch fallback:", error);
  }

  // Return structured fallback menu data matching Swiggy schema
  const fallbackData = getFallbackMenuData(resId);
  return NextResponse.json({ data: fallbackData });
}

function getFallbackMenuData(resId: string) {
  return {
    cards: [
      {},
      {},
      {
        card: {
          card: {
            info: {
              id: resId,
              name: "Tasty Bites Deluxe Restaurant",
              cuisines: ["Pizzas", "Burgers", "Italian", "Fast Food"],
              costForTwoMessage: "₹350 for two",
            },
          },
        },
      },
      {},
      {
        groupedCard: {
          cardGroupMap: {
            REGULAR: {
              cards: [
                {
                  card: {
                    card: {
                      "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Recommended",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: `${resId}-101`,
                              name: "Special Cheese Burst Pizza",
                              description:
                                "Loaded with extra mozzarella cheese, bell peppers, olives, and fresh tomatoes.",
                              imageId: "e0839dd57d21e64980da67a57a9e0486",
                              price: 34900,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: `${resId}-102`,
                              name: "Crispy Paneer Burger",
                              description:
                                "Spicy crispy paneer patty topped with fresh lettuce, mayo, and cheese slice.",
                              imageId: "f15e51381e4b3164998782a20967520e",
                              price: 18900,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: `${resId}-103`,
                              name: "Garlic Breadsticks with Cheese Dip",
                              description:
                                "Freshly baked garlic breadsticks served with creamy warm cheese dip.",
                              imageId: "bdcd233971b7c81d77e55ead5861354c",
                              price: 14900,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Starters & Appetizers",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: `${resId}-201`,
                              name: "Peri Peri French Fries",
                              description:
                                "Crispy golden fries tossed in aromatic peri peri spice mix.",
                              imageId: "f15e51381e4b3164998782a20967520e",
                              price: 11900,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: `${resId}-202`,
                              name: "Stuffed Veg Momos (8 Pcs)",
                              description:
                                "Steamed dumplings stuffed with finely chopped vegetables served with spicy chutney.",
                              imageId: "bdcd233971b7c81d77e55ead5861354c",
                              price: 15900,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type": "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Beverages & Desserts",
                      itemCards: [
                        {
                          card: {
                            info: {
                              id: `${resId}-301`,
                              name: "Choco Lava Cake",
                              description:
                                "Warm chocolate cake filled with gooey molten chocolate center.",
                              imageId: "e0839dd57d21e64980da67a57a9e0486",
                              price: 9900,
                            },
                          },
                        },
                        {
                          card: {
                            info: {
                              id: `${resId}-302`,
                              name: "Chilled Mango Milkshake",
                              description:
                                "Thick creamy mango shake made with fresh Alphonso mango pulp.",
                              imageId: "f15e51381e4b3164998782a20967520e",
                              price: 12900,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  };
}
