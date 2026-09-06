import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Valid message prompt is required" },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      // Endpoints & Models to try
      const modelConfigs = [
        { ver: "v1beta", model: "gemini-1.5-flash-latest" },
        { ver: "v1beta", model: "gemini-2.0-flash" },
        { ver: "v1beta", model: "gemini-1.5-pro-latest" },
        { ver: "v1", model: "gemini-1.5-flash" },
        { ver: "v1beta", model: "gemini-1.5-flash" },
      ];

      for (const cfg of modelConfigs) {
        try {
          const systemInstructionText = `You are "TastyAI", an elite AI Sommelier, Master Chef, and Culinary Companion for the TastyBites food app.
Answer the user's prompt directly and specifically.
- If the user asks for pizza, recommend pizza. If burger, recommend burger. If salad, recommend salad.
- Give flavor notes, calorie estimates, and drink pairings.
- Use markdown bold, emojis, and bullet points.`;

          const contentsArray = [];
          if (Array.isArray(history)) {
            for (const h of history) {
              contentsArray.push({
                role: h.sender === "user" ? "user" : "model",
                parts: [{ text: h.text }],
              });
            }
          }
          contentsArray.push({
            role: "user",
            parts: [{ text: message }],
          });

          const url = `https://generativelanguage.googleapis.com/${cfg.ver}/models/${cfg.model}:generateContent?key=${apiKey}`;

          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemInstructionText}\n\nUser Question: ${message}` }],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
              },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const replyText =
              data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (replyText) {
              const suggestedItems = extractSuggestedItems(message, replyText);
              return NextResponse.json({
                reply: replyText,
                suggestedItems,
              });
            }
          } else {
            const errText = await response.text();
            console.error(`Gemini call (${cfg.ver}/${cfg.model}) failed (${response.status}):`, errText);
          }
        } catch (err) {
          console.error(`Error calling Gemini cfg ${cfg.model}:`, err);
        }
      }
    }

    // Dynamic Context-Aware Generator Fallback
    const fallbackReply = generateSmartFallbackReply(message);
    const suggestedItems = extractSuggestedItems(message, fallbackReply);

    return NextResponse.json({
      reply: fallbackReply,
      suggestedItems,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process AI request" },
      { status: 500 }
    );
  }
}

function generateSmartFallbackReply(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes("pizza") || query.includes("italian") || query.includes("pasta") || query.includes("bread")) {
    return `🍕 **TastyAI Italian Gourmet Recommendation:**\n\nFor an authentic Italian experience, I recommend our **Special Cheese Burst Pizza** loaded with extra mozzarella, bell peppers, and black olives.\n\n🍷 **Drink Pairing:** A chilled **Sparkling Berry Mojito** cuts through the rich cheese crust perfectly!`;
  }

  if (query.includes("burger") || query.includes("fries") || query.includes("fast food") || query.includes("snack")) {
    return `🍔 **TastyAI Burger & Sides Pick:**\n\n• **Crispy Paneer Burger**: Spicy golden paneer patty topped with fresh lettuce, mayo, and cheese slice.\n• **Peri Peri French Fries**: Crisp golden fries tossed in aromatic spice mix.\n\n🥤 **Drink Pairing:** Thick **Chilled Mango Milkshake**!`;
  }

  if (query.includes("protein") || query.includes("healthy") || query.includes("gym") || query.includes("keto") || query.includes("salad") || query.includes("diet")) {
    return `🥗 **TastyAI Fitness & High-Protein Guide:**\n\n• **Grilled Paneer & Quinoa Super Bowl** (~34g Protein, 420 Cal)\n• **Avocado Citrus Salad** with toasted seeds and olive oil dressing\n\n💪 **Chef's Tip:** Pair with a fresh **Sugar-Free Green Smoothie** for maximum post-workout recovery!`;
  }

  if (query.includes("vegan") || query.includes("plant") || query.includes("mushrooms") || query.includes("momo")) {
    return `🌱 **TastyAI Pure Plant-Based Selections:**\n\n1. **Stuffed Veg Momos (8 Pcs)** with fiery chili sesame chutney.\n2. **Truffle Edamame Bowls** with toasted sesame.\n3. **Crispy Peri Peri Mushroom Burger** with avocado mayo.`;
  }

  if (query.includes("dessert") || query.includes("sweet") || query.includes("cake") || query.includes("chocolate") || query.includes("ice cream")) {
    return `🍰 **TastyAI Sweet Craving Satisfier:**\n\nYou cannot go wrong with our **Molten Choco Lava Cake** served warm with a gooey molten chocolate center, or a tall glass of **Alphonso Mango Shake**!`;
  }

  if (query.includes("asian") || query.includes("sushi") || query.includes("ramen") || query.includes("noodles") || query.includes("tokyo")) {
    return `🍜 **TastyAI Asian Fusion Masterpiece:**\n\n• **Tokyo Shoyu Ramen** with rich savory broth, bamboo shoots & soft boiled egg.\n• **Salmon & Avocado Roll** (6 Pcs) with pickled ginger & wasabi.`;
  }

  return `👨‍🍳 **TastyAI Gourmet Recommendation:**\n\nBased on your query "*${userMessage}*", here are my top chef picks today:\n\n• **Special Cheese Burst Pizza** (Best Seller)\n• **Crispy Paneer Burger & Peri Peri Fries**\n• **Grilled Quinoa Protein Bowl**\n\nWould you like me to suggest drink pairings, calorie details, or budget options?`;
}

function extractSuggestedItems(query: string, replyText: string) {
  const q = (query + " " + replyText).toLowerCase();
  const items = [];

  if (q.includes("pizza") || q.includes("italian") || q.includes("cheese")) {
    items.push({
      id: "101-101",
      name: "Special Cheese Burst Pizza",
      price: 349,
      description: "Loaded with extra mozzarella cheese, bell peppers & olives.",
      restaurantName: "The Gourmet Bistro & Bar",
    });
  }

  if (q.includes("burger") || q.includes("fries") || q.includes("fast food")) {
    items.push({
      id: "101-102",
      name: "Crispy Paneer Burger",
      price: 189,
      description: "Spicy paneer patty topped with fresh lettuce & cheese slice.",
      restaurantName: "Smokey Shack Burgers",
    });
  }

  if (q.includes("protein") || q.includes("quinoa") || q.includes("salad") || q.includes("healthy") || q.includes("bowl")) {
    items.push({
      id: "104-101",
      name: "Grilled Paneer & Quinoa Super Bowl",
      price: 289,
      description: "High protein bowl with grilled paneer, quinoa, avocado & greens.",
      restaurantName: "The Green Garden Cafe",
    });
  }

  if (q.includes("dessert") || q.includes("sweet") || q.includes("cake") || q.includes("choco")) {
    items.push({
      id: "101-301",
      name: "Choco Lava Cake",
      price: 99,
      description: "Warm chocolate cake filled with gooey molten chocolate center.",
      restaurantName: "Sweet Haven Desserts",
    });
  }

  if (items.length === 0) {
    items.push({
      id: "101-101",
      name: "Special Cheese Burst Pizza",
      price: 349,
      description: "Chef's special double cheese crust pizza.",
      restaurantName: "The Gourmet Bistro & Bar",
    });
  }

  return items.slice(0, 2);
}
