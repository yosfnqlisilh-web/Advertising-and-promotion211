'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { MenuIcon, XIcon, MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from "../components/icons";
import WorkCard from "../components/WorkCard";
import ServiceCard from "../components/ServiceCard";
import ContactModal from "../components/ContactModal";
import { submitContactForm } from './actions';
import './animations.css';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full h-14 items-center justify-center rounded-lg px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      {pending ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
    </button>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialState = { message: "", errors: {}, success: false };
  const [state, dispatch] = useFormState(submitContactForm, initialState);

  const services = [
    {
      title: "واجهات كلادينج",
      subtitles: ["تجاري", "سكني", "ديكور داخلي"],
      description: "تنفيذ وتلبيس واجهات المباني باستخدام الكلادينج، الجبس بورد، والأسمنت بورد بتصاميم عصرية.",
      images: [
        "https://i.imgur.com/YrTCdO2.png",
        "https://i.imgur.com/5aTvOYa.png",
        "https://i.imgur.com/2eOItYF.jpg",
        "https://i.imgur.com/8Thwfi0.png"
      ],
    },
    {
      title: "لوحات اعلانية",
      subtitles: ["حروف بارزه", "لوحات المحلات", "شاشات رقميه", "شعارات استثنائيه"],
      description: "تصميم وتصنيع كافة أنواع لوحات المحلات، من الحروف البارزة إلى الشاشات الرقمية واللافتات الإعلانية.",
      images: [
        "https://i.imgur.com/EzNhASb.jpg",
        "https://i.imgur.com/zWUhCEc.jpg",
        "https://i.imgur.com/89CDMkW.png",
        "https://i.imgur.com/T4dGKwQ.png"
      ],
    },
    {
      title: "هياكل معدنية",
      subtitles: ["لوحات عملاقه", "اسوار حمايه", "هناجر"],
      description: "بناء أسوار دعائية بهياكل معدنية متنوعة، مصممة خصيصًا لتتناسب مع متطلبات المشروع وميزانيته.",
      images: [
        "https://i.imgur.com/JUiqIBd.png",
        "https://i.imgur.com/uMTqBYi.jpg",
        "https://i.imgur.com/f07CxyZ.png",
        "https://i.imgur.com/GgePb8P.png"
      ],
    },
    {
      title: "طباعة رقمية",
      subtitles: ["بنر", "فليكس", "استيكر", "لوحات", "رول اب", "بوب اب", "بوثات"],
      description: "تقديم حلول الطباعة الرقمية بجميع أنواعها لتغطية كافة الاحتياجات الإعلانية والتجارية.",
       images: [
        "https://i.imgur.com/lb2mfJ6.png",
        "https://i.imgur.com/dMKdaQC.png",
        "https://i.imgur.com/jFDHpA0.png",
        "https://i.imgur.com/FbS5a8I.png"
      ],
    },
    {
      title: "أعمال الحديد",
      subtitles: ["قص ليزر", "أبواب", "درابزين", "مضلات", "سواتر", "اسقف الاحواش"],
      description: "تصنيع وتركيب المظلات والسواتر، الهياكل المعدنية، وأعمال الحدادة المساندة لمشاريع الدعاية.",
      images: [
        "https://i.imgur.com/zRHw0N8.png",
        "https://i.imgur.com/vC1BF6q.png",
        "https://i.imgur.com/JwbvsLe.png",
        "https://i.imgur.com/1wYNwDo.png"
      ],
    },
    {
      title: "صيانة وترميم",
      subtitles: ["تجديد", "تطوير", "اضافة"],
      description: "نقدم خدمات الصيانة الدورية والترميم للوحات الإعلانية وواجهات الكلادينج لضمان استمرارها بأفضل مظهر.",
      images: [
        "https://i.imgur.com/65dxBTN.png",
        "https://i.imgur.com/L8IwtO5.png"
      ],
    },
  ];

  const works = [
    {
      title: "تطوير واجهة فيلا بالنسيم",
      category: "تلبيس وتطوير الواجهات",
      imgSrc: "https://i.imgur.com/YrTCdO2.png",
      description: "عمل تطوير فيلا في حي النسيم، باستخدام كلادينج خشبي بنظام الشرائح مع تلبيس إطارات الشبابيك بكلادينج مقصوص بتقنية الليزر."
    },
    {
      title: "لوحة لمطعم دجاج شواية",
      category: "اللوحات الإعلانية",
      imgSrc: "https://i.imgur.com/zWUhCEc.jpg",
      description: "تصنيع وتركيب لوحة حروف بارزة مضيئة لمطعم 'دجاج شواية'، مع خلفية من الكلادينج لإبراز العلامة التجارية وجذب الزبائن."
    },
    {
      title: "لافتة أرض فضاء",
      category: "الأسوار والهياكل",
      imgSrc: "https://i.imgur.com/JUiqIBd.png",
      description: "تصميم وتنفيذ لافتة إعلانية متكاملة لأرض فضاء، حل اقتصادي وعملي ومثالي للاستخدامات المؤقتة والدائمة."
    },
    {
      title: "واجهة كلادينج لمبنى تجاري",
      category: "تلبيس وتطوير الواجهات",
      imgSrc: "https://i.imgur.com/5aTvOYa.png",
      description: "تلبيس كامل لواجهة مبنى تجاري باستخدام كلادينج عالي الجودة، مما أضفى مظهرًا عصريًا وفخمًا للمبنى."
    },
    {
      title: "لوحة فرع صيدلية الدواء",
      category: "اللوحات الإعلانية",
      imgSrc: "https://i.imgur.com/89CDMkW.png",
      description: "تركيب لوحة من الفليكس والحروف البارزة لفرع صيدلية الدواء، مما يضمن وضوح العلامة التجارية وسهولة رؤيتها."
    },
    {
      title: "هيكل معدني لواجهة عرض",
      category: "الأسوار والهياكل",
      imgSrc: "https://i.imgur.com/uMTqBYi.jpg",
      description: "تصنيع وتركيب هيكل معدني متين لواجهة عرض تجارية، تم تصميمه ليكون أساسًا قويًا ومتينًا لتثبيت عناصر الواجهة المختلفة."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            <Link href="#" className="flex items-center gap-3" prefetch={false}>
              <Image src="/file.svg" alt="شعار فن الإعلان" width={28} height={28} className="invert" />
              <div>
                <span className="text-xl font-bold text-white">فن الإعلان</span>
                <span className="block text-xs text-gray-400">مقاولات محدودة</span>
              </div>
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:inline-flex h-12 items-center justify-center rounded-lg px-8 text-base transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold"
            >
              تواصل معنا
            </button>
            <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <XIcon className="h-7 w-7 text-white" /> : <MenuIcon className="h-7 w-7 text-white" />}
              <span className="sr-only">{isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}</span>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 text-2xl z-40">
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
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold animated-gradient-text pb-4" style={{ letterSpacing: '0.2em' }}>
              واجهات فريدة ولوحات إعلانية تترك أثراً
            </h1>
            <p className="mt-8 max-w-4xl mx-auto text-xl sm:text-2xl text-gray-200">
               نحن شركاؤك في النجاح. نقدم حلولاً مبتكرة في الكلادينج واللوحات الإعلانية وأعمال الديكور التي تضمن تميز علامتك التجارية في قلب الرياض.
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

        <section id="services" className="py-24 sm:py-40 bg-gray-800">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">خدماتنا المتكاملة</h2>
              <p className="mt-6 text-xl text-gray-400">
                من الفكرة إلى التنفيذ، نقدم حلولاً إبداعية ومتكاملة لتحديث واجهات المباني وتصميم كافة أنواع اللوحات الإعلانية التي تبرز علامتك التجارية.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  title={service.title} 
                  description={service.description} 
                  images={service.images} 
                  subtitles={service.subtitles}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="our-work" className="py-24 sm:py-40 bg-gray-900">
          <div className="container">
             <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">من أعمالنا</h2>
              <p className="mt-6 text-xl text-gray-400">
                نفخر بتقديم أعمال استثنائية تعكس شغفنا بالجودة والابتكار. تصفح بعض من مشاريعنا التي أنجزناها في الرياض.
              </p>
            </div>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {works.map((work, index) => (
                <WorkCard 
                  key={index} 
                  title={work.title} 
                  category={work.category} 
                  imgSrc={work.imgSrc} 
                  description={work.description} 
                />
              ))}
            </div>
          </div>
        </section>

        <section id="about-us" className="py-24 sm:py-40 bg-gray-800">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="max-w-xl">
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">خبرتنا في خدمتكم</h2>
                <p className="mt-8 text-xl text-gray-300 leading-relaxed">
                  في "فن الإعلان"، نجمع بين سنوات من الخبرة في السوق السعودي وشغف لا ينتهي بالإبداع. انطلقنا من الرياض لنقدم حلولاً متكاملة في عالم الدعاية والإعلان والمقاولات، مع التزام تام بأعلى معايير الجودة والدقة في التنفيذ.
                </p>
                <p className="mt-8 text-xl text-gray-300 leading-relaxed">
                  فريقنا مكون من مصممين ومهندسين وفنيين محترفين يعملون جنبًا إلى جنب لتحويل رؤية عملائنا إلى حقيقة ملموسة تترك بصمة مميزة. نؤمن بأن كل مشروع هو فرصة لتقديم عمل فني يليق باسم عميلنا ويعزز من علامته التجارية.
                </p>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="https://i.imgur.com/8eTDB7o.png" layout="fill" objectFit="cover" alt="فريق عمل فن الإعلان" className="transform scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 sm:py-40 bg-gray-900">
            <div className="container">
                 <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">تواصل معنا</h2>
                    <p className="mt-6 text-xl text-gray-400">
                        هل لديك مشروع جديد أو فكرة تود تنفيذها؟ نحن هنا لمساعدتك. تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر.
                    </p>
                </div>
                <div className="mt-20 grid lg:grid-cols-2 gap-16">
                    <div className="bg-gray-800 rounded-2xl p-10 border border-white/10">
                        <h3 className="text-3xl font-bold text-white mb-8">أرسل لنا رسالة</h3>
                        <form action={dispatch} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="sr-only">الاسم</label>
                                <input type="text" name="name" id="name" placeholder="الاسم الكامل" className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                                {state.errors?.name && <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">رقم الجوال</label>
                                <input type="tel" name="phone" id="phone" placeholder="رقم الجوال (مثال: 05xxxxxxxxx)" className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                                {state.errors?.phone && <p className="mt-2 text-sm text-red-500">{state.errors.phone[0]}</p>}
                            </div>
                            <div>
                                <label htmlFor="message" className="sr-only">الرسالة</label>
                                <textarea name="message" id="message" rows={4} placeholder="اكتب رسالتك هنا..." className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                                {state.errors?.message && <p className="mt-2 text-sm text-red-500">{state.errors.message[0]}</p>}
                            </div>
                            <div>
                                <SubmitButton />
                            </div>
                            {state.message && (
                              <p className={`mt-4 text-center text-lg ${state.success ? 'text-green-400' : 'text-red-500'}`}>{state.message}</p>
                            )}
                        </form>
                    </div>
                     <div className="space-y-10">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-6">معلومات الاتصال</h3>
                          <div className="space-y-4 text-lg text-gray-300">
                            <p className="flex items-start gap-4">
                              <MapPinIcon className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                              <a href="https://maps.app.goo.gl/2yJNfnqTA1hnAycV9" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                                <span>مجمع الوسط التجاري, حي الصالحية</span>
                                <span className="block text-sm text-gray-500">(اضغط للانتقال إلى الموقع على الخريطة)</span>
                              </a>
                            </p>
                            <p className="flex items-center gap-4">
                              <PhoneIcon className="w-6 h-6 text-yellow-400" />
                              <a href="tel:0557517792" className="hover:text-yellow-400">0557517792</a>
                            </p>
                            <p className="flex items-center gap-4">
                              <MailIcon className="w-6 h-6 text-yellow-400" />
                              <a href="mailto:yosfnqlisilh@gmail.com" className="hover:text-yellow-400">yosfnqlisilh@gmail.com</a>
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

      <footer className="bg-gray-800 py-16 border-t border-white/10">
        <div className="container text-center">
            <div className="flex justify-center gap-8 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="w-7 h-7" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="w-7 h-7" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon className="w-7 h-7" /></a>
            </div>
            <p className="text-lg text-gray-500" suppressHydrationWarning>&copy; {new Date().getFullYear()} فن الإعلان. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
