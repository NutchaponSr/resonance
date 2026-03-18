import localFont from "next/font/local";

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

const font = localFont({
  src: [
    {
      path: "../../public/sf-pro-display-regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/sf-pro-display-medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/sf-pro-display-bold.woff2",
      weight: "700",
    },
  ]
});

export const metadata: Metadata = {
  title: "Resonance",
  description: "Resonance is a platform for schools to manage their students and staff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${font.className} antialiased`}>
          {children}
        </body>
      </html>
    </Providers>
  );
}
