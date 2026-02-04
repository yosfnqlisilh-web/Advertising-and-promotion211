'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import data
import { works } from '../lib/data';

// Import components and icons
import { ArrowRightIcon } from "../components/icons";
import RealWhatsAppIcon from "../components/SocialIcons/RealWhatsAppIcon";
import RealGoogleMapsIcon from "../components/SocialIcons/RealGoogleMapsIcon";
import RealEmailIcon from "../components/SocialIcons/RealEmailIcon";
import RealPhoneIcon from "../components/SocialIcons/RealPhoneIcon";
import WorkCard from "../components/WorkCard";
import AnimatedSection from "../components/AnimatedSection";

import { submitContactForm, FormState } from './actions';
import './animations.css';

function RotatingWords() {
  const words = ["نخطط", "نصمم", "ننفذ"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => { setIndex((prevIndex) => (prevIndex + 1) % words.length); }, 1200);
    return () => clearInterval(timer);
  }, [words.length]);
  return (
    <div className="mt-8 h-10 flex items-center justify-center overflow-hidden font-sans">
      <div key={index} className="text-2xl sm:text-3xl font-bold tracking-widest bg-gold-gradient bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-500">{words[index]}</div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full h-16 items-center justify-center rounded-2xl px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-black disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95">
      {pending ? 'جارٍ الإرسال...' : 'إرسال الرسالة الآن'}
    </button>
  );
}

export default function Home() {
  const initialState: FormState = { message: "", errors: undefined, success: false };
  const [state, dispatch] = useFormState(submitContactForm, initialState);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans text-right" dir="rtl">
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center text-center bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542871793-1c39a82d7335?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 container px-4">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold animated-gradient-text pb-4 leading-tight">واجهات فريدة<br/>ولوحات تترك أثراً</h1>
            <p className="mt-8 max-w-4xl mx-auto text-xl sm:text-2xl text-gray-200 font-medium opacity-90">في فن الإعلان، نقدم حلولاً مبتكرة تضمن تميز علامتك التجارية في كل أحياء ومناطق الرياض.</p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link href="/services" className="inline-flex h-14 items-center justify-center rounded-lg px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold animate-shadow-gold">اكتشف خدماتنا</Link>
              <Link href="#our-work" className="inline-flex h-14 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-10 text-xl font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20">شاهد أعمالنا</Link>
            </div>
            <RotatingWords />
          </div>
        </section>

        {/* WORK SECTION */}
        <AnimatedSection id="our-work" className="py-24 sm:py-32 bg-gray-900 overflow-hidden">
          <div className="container">
             <div className="text-center max-w-4xl mx-auto mb-20">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight animated-gradient-text pb-4">من أعمالنا المميزة</h2>
              <p className="mt-6 text-xl text-gray-400 font-medium">أعمال تعكس شغفنا بالجودة والابتكار في كافة مناطق الرياض.</p>
            </div>
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              navigation={true}
              className="work-swiper pb-16"
            >
              {works.map((work, index) => (
                <SwiperSlide key={index}><WorkCard {...work} isSimple={true} /></SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-10 text-center">
                <Link href="/gallery" className="group inline-flex items-center justify-center rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-black transition-all hover:bg-yellow-300 shadow-xl hover:shadow-yellow-400/20 transform hover:-translate-y-1">
                    <span>تصفح معرض الأعمال بالكامل</span>
                    <ArrowRightIcon className="w-6 h-6 mr-3 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* ABOUT SECTION */}
        <AnimatedSection id="about-us" className="py-24 sm:py-32 bg-gray-800 text-right">
            <div className="container px-4">
                <div className="grid lg:grid-cols-2 gap-20 items-center text-right">
                    <div className="max-w-xl border-r-4 border-yellow-500 pr-8">
                        <h2 className="text-5xl sm:text-6xl font-bold tracking-tight animated-gradient-text pb-4 leading-tight">خبرتنا في خدمتكم</h2>
                        <p className="mt-8 text-xl text-gray-300 leading-relaxed font-bold italic underline underline-offset-8 decoration-yellow-500/20 mb-6">نخدم في كل أحياء ومناطق الرياض</p>
                        <p className="mt-6 text-xl text-gray-300 leading-relaxed font-medium">نحول الرؤية إلى واقع فني يبرز هوية مشروعك التجاري بأفضل جودة.</p>
                    </div>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        <Image src="https://i.imgur.com/8eTDB7o.png" layout="fill" objectFit="cover" alt="فريق عمل فن الإعلان" className="transform scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                </div>
            </div>
        </AnimatedSection>

        {/* CONTACT SECTION */}
        <AnimatedSection id="contact" className="py-32 sm:py-48 bg-gray-900 relative overflow-hidden">
          <div className="container px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto mb-20">
                <h2 className="text-5xl sm:text-7xl font-black animated-gradient-text pb-6 leading-tight">تواصل معنا الآن</h2>
                <p className="text-xl sm:text-2xl text-gray-400 font-bold italic tracking-wide">نخدم في كافة أحياء ومناطق الرياض</p>
              </div>

              <div className="grid lg:grid-cols-5 gap-12 items-stretch text-right">
                {/* Contact Form Card */}
                <div className="lg:col-span-3 bg-gray-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 border border-white/10 shadow-2xl relative">
                    <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                        <span className="w-2 h-8 bg-yellow-500 rounded-full"></span>
                        أرسل لنا تفاصيل مشروعك
                    </h3>
                    <form action={dispatch} className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 mr-2 uppercase tracking-widest">الاسم الكامل</label>
                                <input type="text" name="name" placeholder="محمد السالم" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 ring-yellow-500 outline-none transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 mr-2 uppercase tracking-widest">رقم الجوال</label>
                                <input type="tel" name="phone" placeholder="05xxxxxxxx" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 ring-yellow-500 outline-none transition-all" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 mr-2 uppercase tracking-widest">وصف العمل المطلوب</label>
                            <textarea name="message" rows={4} placeholder="اكتب هنا تفاصيل اللوحة أو الواجهة..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 ring-yellow-500 outline-none transition-all" required></textarea>
                        </div>
                        <SubmitButton />
                        {state.message && (
                            <div className={`mt-6 p-6 rounded-[2rem] text-center font-bold text-xl transition-all shadow-2xl animate-in zoom-in-95 duration-500 ${state.success ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                                {state.success ? '🚀 ' : '⚠️ '}{state.message}
                            </div>
                        )}
                    </form>
                </div>

                {/* Quick Info Card */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] p-10 border border-white/5 shadow-2xl flex-1 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-12 border-r-4 border-yellow-500 pr-6">قنوات الاستجابة السريعة</h3>
                        
                        <div className="space-y-12">
                            <a href="tel:0557517792" className="flex items-center gap-6 group">
                                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-500 shadow-xl"><RealPhoneIcon className="w-8 h-8" /></div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">اتصل بنا الآن</p>
                                    <p className="text-2xl font-black text-white tracking-widest">0557517792</p>
                                </div>
                            </a>

                            <a href="https://wa.me/966557517792" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all duration-500 shadow-xl"><RealWhatsAppIcon className="w-8 h-8" /></div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">واتساب سريع</p>
                                    <p className="text-2xl font-black text-green-400">ابدأ المحادثة</p>
                                </div>
                            </a>

                            <a href="mailto:admin@fan-alelan.com" className="flex items-center gap-6 group">
                                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-500 shadow-xl"><RealEmailIcon className="w-8 h-8" /></div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">راسلنا بريدياً</p>
                                    <p className="text-lg font-bold text-white break-all">admin@fan-alelan.com</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    {/* Maps Mini Card */}
                    <a href="https://share.google/yok3tFEnIDCu8AZbY" target="_blank" rel="noopener noreferrer" className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8 flex items-center justify-between group hover:bg-blue-600/20 transition-all">
                        <div className="flex items-center gap-5">
                            <RealGoogleMapsIcon className="w-12 h-12" />
                            <span className="text-xl font-bold text-blue-400">موقعنا في الرياض</span>
                        </div>
                        <ArrowRightIcon className="w-6 h-6 text-blue-400 rotate-180 group-hover:translate-x-[-5px] transition-transform" />
                    </a>
                </div>
              </div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
