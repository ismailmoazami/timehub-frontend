import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Timehub"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Header />
        {children}
        </Providers>
      </body>
    </html>
  );
}
