import type { Metadata } from "next";
import "./globals.css";

// Properly applying the Metadata type
export const metadata: Metadata = {
  title: "HDFC Retirement Gold Planner",
  description: "An Investor Education Initiative for Technex 26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-montserrat">{children}</body>
    </html>
  );
}