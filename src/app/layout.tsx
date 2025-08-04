import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weekly",
  description: "A platform for sharing weekly updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
