import { SalesHeader, Footer } from "../components/layout/HomeLayout";
import { Toaster } from "@/components/ui/toaster";

// Noto_Sans_JP
import { Noto_Sans_JP } from "next/font/google";
import clsx from "clsx";
import React from "react";
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={clsx(notoSansJP.variable, "font-sans")}>
      <body>
        <SalesHeader style={{ position: "fixed", top: 0, width: "100%" }} />
        <main style={{ paddingTop: "60px", paddingBottom: "60px" }}>
          {children}
        </main>
        <Toaster />
        <Footer style={{ position: "fixed", bottom: 0, width: "100%" }} />
      </body>
    </html>
  );
}
