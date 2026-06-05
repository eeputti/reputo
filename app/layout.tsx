import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Reputo",
  description: "Kerää enemmän Google-arvosteluja automaattisilla arvostelupyynnöillä.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body>{children}</body>
    </html>
  );
}

