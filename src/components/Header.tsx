'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedLogo from './AnimatedLogo'; // Assuming this is in the same folder, adjust if needed
import { MenuIcon, XIcon } from './icons'; // Assuming this is in the same folder, adjust if needed

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", text: "الرئيسية" },
    { href: "/services", text: "خدماتنا" },
    { href: "/#our-work", text: "أعمالنا" },
    { href: "/blog", text: "المدونة" },
    { href: "/#testimonials", text: "الشهادات" },
    { href: "/#faq", text: "الأسئلة الشائعة" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3" prefetch={false} onClick={() => setIsMenuOpen(false)}>
              <div className="flex-shrink-0">
                <AnimatedLogo />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">فن الإعلان</span>
                <span className="block text-xs text-gray-400">مقاولات محدودة</span>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors">{link.text}</Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
                <Link
                  href="/#contact"
                  className="hidden md:inline-flex h-12 items-center justify-center rounded-lg px-8 text-base transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold"
                >
                  تواصل معنا
                </Link>
                
                {/* Mobile Menu Button */}
                <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <XIcon className="h-7 w-7 text-white" /> : <MenuIcon className="h-7 w-7 text-white" />}
                  <span className="sr-only">{isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}</span>
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 z-40 flex flex-col items-center justify-center gap-8 text-2xl">
          {navLinks.map(link => (
             <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">{link.text}</Link>
          ))}
           <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="mt-4 inline-flex h-14 items-center justify-center rounded-lg px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold">تواصل معنا</Link>
        </div>
      )}
    </>
  );
};

export default Header;
