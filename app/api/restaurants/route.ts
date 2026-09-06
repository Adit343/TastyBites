import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0098487&lng=72.5198293&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Referer": "https://www.swiggy.com/",
        },
        next: { revalidate: 60 },
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
    console.error("Swiggy API fetch fallback triggered:", error);
  }

  // Fallback high-quality curated restaurant collection
  return NextResponse.json({
    data: {
      cards: [
        {},
        {},
        {
          card: {
            card: {
              gridElements: {
                infoWithStyle: {
                  restaurants: getCuratedRestaurants()
                }
              }
            }
          }
        }
      ]
    }
  });
}

function getCuratedRestaurants() {
  return [
    {
      info: {
        id: "101",
        name: "The Gourmet Bistro & Bar",
        cloudinaryImageId: "e0839dd57d21e64980da67a57a9e0486",
        cuisines: ["Italian", "Wood-fired Pizzas", "Pasta", "Desserts"],
        costForTwo: "₹400 for two",
        avgRating: 4.8,
        sla: {
          deliveryTime: 25,
          slaString: "20-25 mins",
        },
        promoted: true,
        isPopular: true,
        discountHeader: "50% OFF",
        discountSubHeader: "UPTO ₹100",
        locality: "Satellite",
        areaName: "Prahlad Nagar",
      }
    },
    {
      info: {
        id: "102",
        name: "Tokyo Ramen & Sushi Lounge",
        cloudinaryImageId: "f15e51381e4b3164998782a20967520e",
        cuisines: ["Japanese", "Sushi", "Ramen", "Asian Fusion"],
        costForTwo: "₹600 for two",
        avgRating: 4.7,
        sla: {
          deliveryTime: 32,
          slaString: "30-35 mins",
        },
        promoted: false,
        isPopular: true,
        discountHeader: "₹125 OFF",
        discountSubHeader: "ABOVE ₹499",
        locality: "Bodakdev",
        areaName: "Sindhu Bhavan Road",
      }
    },
    {
      info: {
        id: "103",
        name: "Urban Spice North Indian Grill",
        cloudinaryImageId: "bdcd233971b7c81d77e55ead5861354c",
        cuisines: ["North Indian", "Biryani", "Kebabs", "Mughlai"],
        costForTwo: "₹350 for two",
        avgRating: 4.6,
        sla: {
          deliveryTime: 28,
          slaString: "25-30 mins",
        },
        promoted: true,
        isPopular: true,
        discountHeader: "20% OFF",
        discountSubHeader: "USE TASTY20",
        locality: "Vastrapur",
        areaName: "Drive In Road",
      }
    },
    {
      info: {
        id: "104",
        name: "The Green Garden Cafe (100% Veg)",
        cloudinaryImageId: "e0839dd57d21e64980da67a57a9e0486",
        cuisines: ["Healthy Bowls", "Salads", "Smoothies", "Vegan"],
        costForTwo: "₹300 for two",
        avgRating: 4.9,
        sla: {
          deliveryTime: 20,
          slaString: "15-20 mins",
        },
        promoted: false,
        isPopular: false,
        discountHeader: "FLAT 15% OFF",
        locality: "Navrangpura",
        areaName: "CG Road",
      }
    },
    {
      info: {
        id: "105",
        name: "Smokey Shack Burgers & Shakes",
        cloudinaryImageId: "f15e51381e4b3164998782a20967520e",
        cuisines: ["American", "Burgers", "Loaded Fries", "Milkshakes"],
        costForTwo: "₹350 for two",
        avgRating: 4.5,
        sla: {
          deliveryTime: 22,
          slaString: "20-25 mins",
        },
        promoted: false,
        isPopular: true,
        discountHeader: "FREE ITEM",
        discountSubHeader: "ON ORDERS > ₹399",
        locality: "Ambawadi",
        areaName: "Manekbaug",
      }
    },
    {
      info: {
        id: "106",
        name: "Sweet Haven Desserts & Churros",
        cloudinaryImageId: "bdcd233971b7c81d77e55ead5861354c",
        cuisines: ["Desserts", "Bakery", "Waffles", "Ice Cream"],
        costForTwo: "₹250 for two",
        avgRating: 4.8,
        sla: {
          deliveryTime: 18,
          slaString: "15-20 mins",
        },
        promoted: false,
        isPopular: true,
        locality: "Thaltej",
        areaName: "S G Highway",
      }
    }
  ];
}

