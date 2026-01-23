import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "فن الإعلان | واجهات كلادينج ولوحات إعلانية بالرياض",
  description: "متخصصون في تكسية واجهات المباني بالكلادنج، وتنفيذ اللوحات الإعلانية، والحروف البارزة، وأعمال الحدادة والديكور في الرياض.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
