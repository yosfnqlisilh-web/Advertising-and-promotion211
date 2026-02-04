import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewChatbot from "@/components/NewChatbot";

const notoKufiArabic = Noto_Kufi_Arabic({ 
  subsets: ["arabic"],
  weight: ['400', '700', '900'] 
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://fan-alelan.com"),
  title: {
    default: "فن الإعلان للدعاية والإعلان | واجهات كلادينج ولوحات محلات بالرياض",
    template: "%s | فن الإعلان بالرياض"
  },
  description: "فن الإعلان: متخصصون في تنفيذ واجهات الكلادينج الفاخرة، الحروف البارزة المضيئة، استيكرات السيارات، وأعمال الحديد بالليزر في كافة أحياء ومناطق الرياض. جودة تنفيذ بضمان 15 سنة.",
  keywords: [
    'كلادينج الرياض', 'واجهات كلادينج', 'لوحات محلات الرياض', 'حروف بارزة مضيئة', 
    'تصميم لوحات إعلانية', 'استيكرات سيارات الرياض', 'تغليف سيارات شركات', 
    'أعمال حديد ليزر', 'شروط بلدية الرياض للوحات 2024', 'منصة بلدي لوحات',
    'الواح الخليج كلادينج', 'عرب بوند الرياض', 'مقاولات دعاية وإعلان',
    'حروف أكريليك', 'لوحات زنكور', 'مظلات وسواتر الرياض', 'قص ليزر حديد'
  ],
  authors: [{ name: "فن الإعلان للدعاية والإعلان" }],
  creator: "فن الإعلان",
  publisher: "فن الإعلان للمقاولات",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "فن الإعلان | واجهات كلادينج ولوحات إعلانية بالرياض",
    description: "نحول رؤيتك إلى واقع. تنفيذ واجهات كلادينج ولوحات حروف بارزة في كل مناطق الرياض.",
    url: "https://fan-alelan.com",
    siteName: "فن الإعلان",
    images: [
      {
        url: "https://i.imgur.com/KQNa7oV.png",
        width: 1200,
        height: 630,
        alt: "فن الإعلان للدعاية والإعلان",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فن الإعلان | واجهات كلادينج ولوحات إعلانية بالرياض",
    description: "متخصصون في تصميم وتنفيذ واجهات الكلادينج واللوحات الإعلانية بالرياض.",
    images: ["https://i.imgur.com/KQNa7oV.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufiArabic.className} bg-gray-900 overflow-x-hidden`}>
        <Header /> 
        <div className="relative">
          {children}
        </div>
        <Footer />
        <NewChatbot />
      </body>
    </html>
  );
}
