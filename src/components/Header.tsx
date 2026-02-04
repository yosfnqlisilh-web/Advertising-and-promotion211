'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedLogo from './AnimatedLogo';
import { MenuIcon, XIcon, PhoneIcon } from './icons';
import { services } from '@/lib/data';
import RealWhatsAppIcon from './SocialIcons/RealWhatsAppIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navLinks = [
    { href: "/", text: "الرئيسية" },
    { href: "/#our-work", text: "أعمالنا" },
    { href: "/blog", text: "المدونة" },
    { href: "/#testimonials", text: "الشهادات" },
    { href: "/#faq", text: "الأسئلة الشائعة" },
  ];

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-gray-900/90 backdrop-blur-xl border-b border-white/10 h-20 sm:h-24 transition-all">
        <div className="container h-full px-4 text-right" dir="rtl">
          <div className="flex h-full items-center justify-between gap-4">
            
            <Link href="/" className="flex items-center gap-2 shrink-0 group" onClick={() => setIsMenuOpen(false)}>
              <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"><AnimatedLogo /></div>
              <div className="flex flex-col justify-center">
                <span className="text-xl sm:text-2xl font-bold text-white leading-none">فن الإعلان</span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-widest uppercase">مقاولات محدودة</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-base font-bold text-gray-300 hover:text-yellow-400 transition-colors">الرئيسية</Link>
              <div className="relative py-6" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <Link href="/services" className="flex items-center gap-1 text-base font-bold text-gray-300 hover:text-yellow-400">خدماتنا <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Link>
                <div className={`absolute top-full right-0 w-72 bg-gray-800/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
                   <div className="p-3 grid gap-1">{services.map((s) => (<Link key={s.slug} href={`/services/${s.slug}`} className="block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-yellow-500 hover:text-black rounded-xl transition-all" onClick={() => setIsDropdownOpen(false)}>{s.title}</Link>))}</div>
                </div>
              </div>
              {navLinks.slice(1).map(link => (<Link key={link.href} href={link.href} className="text-base font-bold text-gray-300 hover:text-yellow-400 transition-colors">{link.text}</Link>))}
            </nav>

            <div className="relative">
                <button onClick={() => setIsContactOpen(!isContactOpen)} className="sm:inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-bold transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black hover:scale-105 active:scale-95">تواصل معنا</button>
                {isContactOpen && (
                    <div className="absolute top-full left-0 mt-3 w-56 bg-gray-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-2 flex flex-col gap-1">
                            <a 
                                href="https://wa.me/966557517792" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-3 px-4 py-4 hover:bg-green-600/20 text-green-400 rounded-xl transition-all"
                                onClick={() => setIsContactOpen(false)} // CLOSES AUTOMATICALLY
                            >
                                <RealWhatsAppIcon className="w-6 h-6" /> <span className="font-bold">محادثة واتساب</span>
                            </a>
                            <a 
                                href="tel:0557517792" 
                                className="flex items-center gap-3 px-4 py-4 hover:bg-yellow-500/20 text-yellow-500 rounded-xl transition-all"
                                onClick={() => setIsContactOpen(false)} // CLOSES AUTOMATICALLY
                            >
                                <PhoneIcon className="w-6 h-6" /> <span className="font-bold">اتصال هاتفي</span>
                            </a>
                        </div>
                    </div>
                )}
            </div>
            
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}</button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-950 z-[90] flex flex-col items-center justify-center gap-6 text-xl p-6 animate-in fade-in duration-300 overflow-y-auto">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 font-bold">الرئيسية</Link>
            <div className="w-full text-center border-y border-white/5 py-6">
                <p className="text-yellow-500 font-bold mb-4 italic tracking-widest text-sm">خدماتنا</p>
                <div className="grid grid-cols-1 gap-5">{services.map(s => (<Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setIsMenuOpen(false)} className="text-gray-400 text-lg">{s.title}</Link>))}</div>
            </div>
            <Link href="/#our-work" onClick={() => setIsMenuOpen(false)} className="text-gray-300 font-bold">أعمالنا</Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-gray-300 font-bold">المدونة</Link>
            <div className="grid grid-cols-2 gap-4 w-full mt-6">
                <a href="https://wa.me/966557517792" onClick={() => setIsMenuOpen(false)} className="h-14 flex items-center justify-center rounded-2xl bg-green-600 text-white font-bold text-base"><RealWhatsAppIcon className="w-6 h-6 ml-2" /> واتساب</a>
                <a href="tel:0557517792" onClick={() => setIsMenuOpen(false)} className="h-14 flex items-center justify-center rounded-2xl bg-yellow-500 text-black font-bold text-base"><PhoneIcon className="w-6 h-6 ml-2" /> اتصال</a>
            </div>
        </div>
      )}
    </>
  );
};

export default Header;
