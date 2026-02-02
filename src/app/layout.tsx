import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const notoKufiArabic = Noto_Kufi_Arabic({ 
  subsets: ["arabic"],
  weight: ['400', '700', '900'] 
});

// SEO-Optimized Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://fan-alelan.com"),
  title: "فن الإعلان | واجهات كلادينج ولوحات إعلانية فاخرة بالرياض",
  description: "فن الإعلان: شريكك الأول في الرياض لتصميم وتنفيذ واجهات الكلادينج الفاخرة، اللوحات الإعلانية المضيئة، والهياكل المعدنية. نجمع بين الإبداع، الجودة، والالتزام بتحويل رؤيتك إلى واقع ملموس يخطف الأنظار.",
  keywords: [
    // Core Services
    'كلادينج', 'واجهات كلادينج', 'تركيب كلادينج', 'تلبيس كلادينج', 'كلادينج الرياض',
    'لوحات إعلانية', 'لوحات محلات', 'حروف بارزة', 'لوحات مضيئة', 'لوحات LED',
    // Secondary Services
    'هياكل معدنية', 'هناجر', 'أسوار حماية', 'أعمال حديد', 'قص ليزر', 'أبواب حديد', 'درابزين', 'مظلات', 'سواتر',
    'طباعة رقمية', 'بنر', 'فلكس', 'استيكر',
    // Location-Based
    'كلادينج في الرياض', 'لوحات إعلانية في الرياض', 'مقاول كلادينج الرياض', 'شركة لوحات بالرياض', 
    'تصميم واجهات بالرياض', 'حداد في الرياض',
    // Commercial & Long-Tail
    'أفضل شركة كلادينج بالرياض', 'أسعار تركيب الكلادينج', 'تصميم لوحة محل تجاري', 
    'شروط بلدية الرياض للوحات', 'مقاول واجهات', 'تجديد واجهة مبنى', 'لوحات حروف بارزة مضيئة',
    'كلادينج خشبي', 'كلادينج ذهبي', 'لوحات زنكور',
    // General
    'مقاولات عامة', 'تصميم إعلاني', 'دعاية وإعلان', 'فن الإعلان للمقاولات'
  ],
  authors: [{ name: "فن الإعلان للمقاولات" }],
  creator: "Gemini AI & Firebase",
  publisher: "Firebase",
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/',
    },
  },
  openGraph: {
    title: "فن الإعلان | واجهات كلادينج ولوحات إعلانية فاخرة بالرياض",
    description: "نحول رؤيتك إلى واقع. متخصصون في واجهات الكلادينج، اللوحات الإعلانية المضيئة، وأعمال الحديد التي تبرز علامتك التجارية في الرياض.",
    url: "https://fan-alelan.com",
    siteName: "فن الإعلان للمقاولات",
    images: [
      {
        url: "https://i.imgur.com/KQNa7oV.png", // Main Cladding Image
        width: 1200,
        height: 630,
        alt: "واجهة فيلا فاخرة مغطاة بكلادينج عصري في الرياض",
      },
       {
        url: "https://i.imgur.com/PtI1V0D.png", // Main Signage Image
        width: 1200,
        height: 630,
        alt: "لوحة إعلانية مضيئة بحروف بارزة لمحل تجاري",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فن الإعلان | واجهات كلادينج ولوحات إعلانية فاخرة بالرياض",
    description: "متخصصون في تصميم وتنفيذ واجهات الكلادينج واللوحات الإعلانية بالرياض.",
    creator: "@your-twitter-handle", // Add your Twitter handle
    images: ["https://i.imgur.com/KQNa7oV.png"], 
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      <body className={notoKufiArabic.className}>
        <Header /> 
        {children}
        </body>
    </html>
  );
}
