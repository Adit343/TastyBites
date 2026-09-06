import React from "react";
import "./globals.css";
import Providers from "./providers";
import Header from "../src/Components/Header";

export const metadata = {
  title: "Tasty Bites - Delicious Food Delivered Fast",
  description: "Your number one source for food delivery with quality and speed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
