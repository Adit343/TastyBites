import React from "react";
import "./globals.css";
import Providers from "./providers";
import Header from "../src/Components/Header";
import Footer from "../src/Components/Footer/Footer";
import AIChefWidget from "../src/Components/AI/AIChefWidget";

export const metadata = {
  title: "TastyBites - Gourmet Food Delivery & AI Sommelier",
  description: "Experience modern culinary ordering powered by Gemini AI, custom meal builders, and live order tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
          <AIChefWidget />
        </Providers>
      </body>
    </html>
  );
}
