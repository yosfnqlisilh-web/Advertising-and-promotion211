'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { MenuIcon, XIcon, MailIcon, PhoneIcon, MapPinIcon } from "../components/icons";
import OurWorkCarousel from "../components/OurWorkCarousel";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const claddingSlides = [
    { src: "https://images.unsplash.com/photo-1599399432685-e5b15b8f2c20?fit=crop&w=1200&h=600", alt: "مشروع واجهة كلادينج حديثة", title: "واجهة حديثة" },
    { src: "https://images.unsplash.com/photo-1579208280908-c483726543b5?fit=crop&w=1200&h=600", alt: "واجهة محل تجاري أنيقة", title: "واجهة تجارية" },
    { src: "https://images.unsplash.com/photo-1618062534522-b2132f7a01d5?fit=crop&w=1200&h=600", alt: "تفاصيل ديكور معدني", title: "ديكور معدني" },
  ];

  const signageSlides = [
    { src: "https://images.unsplash.com/photo-1524068984912-f0f3a4a8a5b2?fit=crop&w=1200&h=600", alt: "لوحة حروف بارزة مضيئة", title: "حروف بارزة" },
    { src: "https://images.unsplash.com/photo-1558002118-a6d5c1a96c34?fit=crop&w=1200&h=600", alt: "لوحة إعلانية مضيئة", title: "لوحات مضيئة" },
    { src: "https://images.unsplash.com/photo-1517036319989-bf4a15999359?fit=crop&w=1200&h=600", alt: "تركيب مظلات وسواتر", title: "مظلات وسواتر" },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans">
      <header className="sticky top-0 z-50 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            <Link href="#" className="flex items-center gap-3" prefetch={false}>
              <Image src="/file.svg" alt="شعار فن الإعلان" width={28} height={28} className="invert" />
              <span className="text-xl font-bold text-white">فن الإعلان</span>
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="#" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors" prefetch={false}>
                الرئيسية
              </Link>
              <Link href="#services" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors" prefetch={false}>
                خدماتنا
              </Link>
              <Link href="#our-work" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors" prefetch={false}>
                أعمالنا
              </Link>
              <Link href="#about-us" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors" prefetch={false}>
                من نحن
              </Link>
              <Link href="#contact" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors" prefetch={false}>
                اتصل بنا
              </Link>
            </nav>
            <Link
              href="#contact"
              className="hidden md:inline-flex h-12 items-center justify-center rounded-lg px-8 text-base transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold"
              prefetch={false}
            >
              اطلب عرض سعر
            </Link>
            <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon className="h-7 w-7 text-white" /> : <MenuIcon className="h-7 w-7 text-white" />}
              <span className="sr-only">{isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}</span>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#050505] flex flex-col items-center justify-center gap-8 text-2xl z-40">
            <Link href="#" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">الرئيسية</Link>
            <Link href="#services" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">خدماتنا</Link>
            <Link href="#our-work" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">أعمالنا</Link>
            <Link href="#about-us" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">من نحن</Link>
            <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">اتصل بنا</Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center text-center bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542871793-1c39a82d7335?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 container">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight bg-gold-gradient bg-clip-text text-transparent">
              فن الإعلان: واجهات كلادينج بالرياض
            </h1>
            <p className="mt-8 max-w-4xl mx-auto text-xl sm:text-2xl text-gray-200">
              نصنع الفخامة والجودة. متخصصون في تصميم وتنفيذ واجهات الكلادينج واللوحات الإعلانية وأعمال الديكور التي تلفت الأنظار في الرياض.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link
                href="#services"
                className="inline-flex h-14 items-center justify-center rounded-lg px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold animate-shadow-gold"
                prefetch={false}
              >
                اكتشف خدماتنا
              </Link>
              <Link
                href="#our-work"
                className="inline-flex h-14 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-10 text-xl font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
                prefetch={false}
              >
                شاهد أعمالنا
              </Link>
            </div>
          </div>
        </section>

        <section id="services" className="py-24 sm:py-40 bg-[#101010]">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent">خدماتنا المتكاملة</h2>
              <p className="mt-6 text-xl text-gray-400">
                من الفكرة إلى التنفيذ، نقدم حلولاً إبداعية ومتكاملة لتحديث واجهات المباني التجارية والسكنية وتصميم وتنفيذ كافة أنواع اللوحات الإعلانية التي تبرز علامتك التجارية.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              <div className="bg-[#181818] rounded-2xl p-10 transform hover:-translate-y-4 transition-transform duration-300 border border-white/10 shadow-2xl hover:shadow-gold/20">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gold-gradient mb-8">
                  <Image src="/cladding.svg" alt="أيقونة تكسية واجهات" width="40" height="40" className="invert"/>
                </div>
                <h3 className="mt-6 text-3xl font-bold text-white">تكسية الواجهات</h3>
                <p className="mt-5 text-lg text-gray-400">
                  تنفيذ وتلبيس واجهات الفلل، المحلات، والمباني باستخدام الكلادينج، الجبس بورد، والأسمنت بورد بتصاميم عصرية.
                </p>
              </div>
              <div className="bg-[#181818] rounded-2xl p-10 transform hover:-translate-y-4 transition-transform duration-300 border border-white/10 shadow-2xl hover:shadow-gold/20">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gold-gradient mb-8">
                  <Image src="/signage.svg" alt="أيقونة اللوحات الإعلانية" width="40" height="40" className="invert" />
                </div>
                <h3 className="mt-6 text-3xl font-bold text-white">اللوحات الإعلانية المتكاملة</h3>
                <p className="mt-5 text-lg text-gray-400">
                  تصميم وتصنيع كافة أنواع لوحات المحلات، من الحروف البارزة إلى الشاشات الرقمية واللافتات الإعلانية.
                </p>
              </div>
              <div className="bg-[#181818] rounded-2xl p-10 transform hover:-translate-y-4 transition-transform duration-300 border border-white/10 shadow-2xl hover:shadow-gold/20">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gold-gradient mb-8">
                   <Image src="/structures.svg" alt="أيقونة هياكل دعائية" width="40" height="40" className="invert" />
                </div>
                <h3 className="mt-6 text-3xl font-bold text-white">الأسوار والهياكل الدعائية</h3>
                <p className="mt-5 text-lg text-gray-400">
                  بناء أسوار دعائية بهياكل معدنية متنوعة، مصممة خصيصًا لتتناسب مع متطلبات المشروع وميزانيته.
                </p>
              </div>
              <div className="bg-[#181818] rounded-2xl p-10 transform hover:-translate-y-4 transition-transform duration-300 border border-white/10 shadow-2xl hover:shadow-gold/20">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gold-gradient mb-8">
                   <Image src="/printing.svg" alt="أيقونة الطباعة الرقمية" width="40" height="40" className="invert" />
                </div>
                <h3 className="mt-6 text-3xl font-bold text-white">الطباعة الرقمية</h3>
                <p className="mt-5 text-lg text-gray-400">
                  تقديم حلول الطباعة الرقمية بجميع أنواعها لتغطية كافة الاحتياجات الإعلانية والتجارية.
                </p>
              </div>
              <div className="bg-[#181818] rounded-2xl p-10 transform hover:-translate-y-4 transition-transform duration-300 border border-white/10 shadow-2xl hover:shadow-gold/20">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gold-gradient mb-8">
                   <Image src="/metalwork.svg" alt="أيقونة أعمال الحديد" width="40" height="40" className="invert" />
                </div>
                <h3 className="mt-6 text-3xl font-bold text-white">أعمال الحديد والمقاولات</h3>
                <p className="mt-5 text-lg text-gray-400">
                  تصنيع وتركيب المظلات والسواتر، الهياكل المعدنية، وأعمال الحدادة المساندة لمشاريع الدعاية والإعلان.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="our-work" className="py-24 sm:py-40 bg-[#050505]">
          <div className="container">
             <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent">من أعمالنا</h2>
              <p className="mt-6 text-xl text-gray-400">
                نفخر بتقديم أعمال استثنائية تعكس شغفنا بالجودة والابتكار. تصفح بعض من مشاريعنا التي أنجزناها في الرياض.
              </p>
            </div>

            <div className="mt-20 space-y-16">
                <div>
                    <h3 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">مشاريع الواجهات والكلادينج</h3>
                    <OurWorkCarousel slides={claddingSlides} options={{ loop: true, align: 'start', slidesToScroll: 1, duration: 25 }} />
                </div>
                <div>
                    <h3 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">اللوحات الإعلانية وأعمال الحديد</h3>
                    <OurWorkCarousel slides={signageSlides} options={{ loop: true, align: 'start', slidesToScroll: 1, duration: 25, direction: 'rtl' }} />
                </div>
            </div>

            <div className="mt-20 text-center">
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-yellow-400/50 bg-yellow-400/10 px-10 text-lg font-semibold text-yellow-400 backdrop-blur-md transition-all hover:bg-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                prefetch={false}
              >
                شاهد كل أعمالنا
              </Link>
            </div>
          </div>
        </section>

        <section id="about-us" className="py-24 sm:py-40 bg-[#101010]">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="max-w-xl">
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent">خبرتنا في خدمتكم</h2>
                <p className="mt-8 text-xl text-gray-300 leading-relaxed">
                  في "فن الإعلان"، نجمع بين سنوات من الخبرة في السوق السعودي وشغف لا ينتهي بالإبداع. انطلقنا من الرياض لنقدم حلولاً متكاملة في عالم الدعاية والإعلان والمقاولات، مع التزام تام بأعلى معايير الجودة والدقة في التنفيذ.
                </p>
                <p className="mt-8 text-xl text-gray-300 leading-relaxed">
                  فريقنا مكون من مصممين ومهندسين وفنيين محترفين يعملون جنبًا إلى جنب لتحويل رؤية عملائنا إلى حقيقة ملموسة تترك بصمة مميزة. نؤمن بأن كل مشروع هو فرصة لتقديم عمل فني يليق باسم عميلنا ويعزز من علامته التجارية.
                </p>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?fit=crop&w=800&h=600" layout="fill" objectFit="cover" alt="فريق عمل فن الإعلان" className="transform scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 sm:py-40 bg-[#050505]">
            <div className="container">
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent">تواصل معنا</h2>
                    <p className="mt-6 text-xl text-gray-400">
                        هل لديك مشروع جديد أو فكرة تود تنفيذها؟ نحن هنا لمساعدتك. تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر.
                    </p>
                </div>
                <div className="mt-20 grid lg:grid-cols-2 gap-16">
                    <div className="bg-[#101010] rounded-2xl p-10 border border-white/10">
                        <h3 className="text-3xl font-bold text-white mb-8">أرسل لنا رسالة</h3>
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="sr-only">الاسم</label>
                                <input type="text" name="name" id="name" placeholder="الاسم الكامل" className="w-full bg-[#181818] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
                                <input type="email" name="email" id="email" placeholder="البريد الإلكتروني" className="w-full bg-[#181818] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">الرسالة</label>
                                <textarea name="message" id="message" rows={4} placeholder="اكتب رسالتك هنا..." className="w-full bg-[#181818] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full h-14 items-center justify-center rounded-lg px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold">
                                    إرسال الرسالة
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="space-y-10">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-6">معلومات الاتصال</h3>
                          <div className="space-y-4 text-lg text-gray-300">
                            <p className="flex items-start gap-4">
                              <MapPinIcon className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                              <a href="https://maps.app.goo.gl/2yJNfnqTA1hnAycV9" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">الرياض، المملكة العربية السعودية (الموقع على الخريطة)</a>
                            </p>
                            <p className="flex items-center gap-4">
                              <PhoneIcon className="w-6 h-6 text-yellow-400" />
                              <a href="tel:0557517792" className="hover:text-yellow-400">0557517792</a>
                            </p>
                            <p className="flex items-center gap-4">
                              <MailIcon className="w-6 h-6 text-yellow-400" />
                              <a href="mailto:info@fanalelan.com" className="hover:text-yellow-400">info@fanalelan.com</a>
                            </p>
                          </div>
                        </div>
                        <div className="h-96 w-full rounded-2xl overflow-hidden border border-white/10">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3623.674982188236!2d46.68541997536764!3d24.73819837798781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDQ0JzE3LjUiTiA0NsKwNDEnMTYuOCJF!5e0!3m2!1sen!2ssa!4v1716215339396!5m2!1sen!2ssa"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale-[80%] invert-[100%] contrast-[1.2]"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-[#101010] py-16 border-t border-white/10">
        <div className="container text-center">
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">تويتر</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">انستغرام</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">لينكدإن</a>
            </div>
            <p className="text-lg text-gray-500" suppressHydrationWarning>&copy; {new Date().getFullYear()} فن الإعلان. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
