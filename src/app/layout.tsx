import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // استيراد الهيدر

const notoKufiArabic = Noto_Kufi_Arabic({ 
  subsets: ["arabic"],
  weight: ['400', '700', '900'] 
});

export const metadata: Metadata = {
  title: "فن الإعلان للمقاولات | واجهات كلادينج ولوحات إعلانية بالرياض",
  description: "شركة فن الإعلان للمقاولات، متخصصون في تصميم وتنفيذ واجهات الكلادينج، اللوحات الإعلانية، أعمال الحديد، والهياكل المعدنية في الرياض. جودة عالية وتصاميم مبتكرة.",
  keywords: "كلادينج, لوحات إعلانية, حروف بارزة, هياكل معدنية, أعمال حديد, تصميم واجهات, مقاولات, الرياض, فن الإعلان",
  authors: [{ name: "فن الإعلان للمقاولات" }],
  creator: "Gemini AI",
  publisher: "Firebase",
  openGraph: {
    title: "فن الإعلان للمقاولات | واجهات كلادينج ولوحات إعلانية بالرياض",
    description: "نقدم حلولاً مبتكرة في الكلادينج واللوحات الإعلانية وأعمال الديكور التي تضمن تميز علامتك التجارية في قلب الرياض.",
    url: "YOUR_DEPLOYED_URL_HERE",
    siteName: "فن الإعلان للمقاولات",
    images: [
      {
        url: "https://i.imgur.com/5aTvOYa.png", 
        width: 800,
        height: 600,
        alt: "واجهة كلادينج حديثة",
      },
       {
        url: "https://i.imgur.com/EzNhASb.jpg", 
        width: 800,
        height: 600,
        alt: "لوحة إعلانية بارزة",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فن الإعلان للمقاولات | واجهات كلادينج ولوحات إعلانية بالرياض",
    description: "متخصصون في تصميم وتنفيذ واجهات الكلادينج واللوحات الإعلانية بالرياض.",
    images: ["https://i.imgur.com/5aTvOYa.png"], 
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={notoKufiArabic.className}>
        <Header /> 
        {children}
        </body>
    </html>
  );
}
