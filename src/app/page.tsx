'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

// Import components and icons
import { MenuIcon, XIcon, MailIcon, PhoneIcon, MapPinIcon, FacebookIcon, InstagramIcon, LinkedinIcon, QuoteIcon, ChevronDownIcon } from "../components/icons";
import WorkCard from "../components/WorkCard";
import ServiceCard from "../components/ServiceCard";
import ContactModal from "../components/ContactModal";
import AnimatedSection from "../components/AnimatedSection";
import TestimonialCard from "../components/TestimonialCard";
import FaqItem from "../components/FaqItem";

import { submitContactForm } from './actions';
import './animations.css';

// Define the type for our form state
type FormState = {
  message: string;
  errors?: {
    name?: string[];
    phone?: string[];
    message?: string[];
  };
  success: boolean;
};

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
  
  // Initialize state with the correct type
  const initialState: FormState = { 
    message: "", 
    errors: undefined, 
    success: false 
  };
  const [state, dispatch] = useFormState(submitContactForm, initialState);

  const services = [
    { title: "واجهات كلادينج", subtitles: ["تجاري", "سكني", "ديكور داخلي"], description: "تنفيذ وتلبيس واجهات المباني باستخدام الكلادينج، الجبس بورد، والأسمنت بورد بتصاميم عصرية.", images: ["https://i.imgur.com/YrTCdO2.png", "https://i.imgur.com/5aTvOYa.png", "https://i.imgur.com/2eOItYF.jpg", "https://i.imgur.com/8Thwfi0.png"] },
    { title: "لوحات اعلانية", subtitles: ["حروف بارزه", "لوحات المحلات", "شاشات رقميه", "شعارات استثنائيه"], description: "تصميم وتصنيع كافة أنواع لوحات المحلات، من الحروف البارزة إلى الشاشات الرقمية واللافتات الإعلانية.", images: ["https://i.imgur.com/EzNhASb.jpg", "https://i.imgur.com/zWUhCEc.jpg", "https://i.imgur.com/89CDMkW.png", "https://i.imgur.com/T4dGKwQ.png"] },
    { title: "هياكل معدنية", subtitles: ["لوحات عملاقه", "اسوار حمايه", "هناجر"], description: "بناء أسوار دعائية بهياكل معدنية متنوعة، مصممة خصيصًا لتتناسب مع متطلبات المشروع وميزانيته.", images: ["https://i.imgur.com/JUiqIBd.png", "https://i.imgur.com/uMTqBYi.jpg", "https://i.imgur.com/f07CxyZ.png", "https://i.imgur.com/GgePb8P.png"] },
    { title: "طباعة رقمية", subtitles: ["بنر", "فليكس", "استيكر", "لوحات", "رول اب", "بوب اب", "بوثات"], description: "تقديم حلول الطباعة الرقمية بجميع أنواعها لتغطية كافة الاحتياجات الإعلانية والتجارية.", images: ["https://i.imgur.com/lb2mfJ6.png", "https://i.imgur.com/dMKdaQC.png", "https://i.imgur.com/jFDHpA0.png", "https://i.imgur.com/FbS5a8I.png"] },
    { title: "أعمال الحديد", subtitles: ["قص ليزر", "أبواب", "درابزين", "مضلات", "سواتر", "اسقف الاحواش"], description: "تصنيع وتركيب المظلات والسواتر، الهياكل المعدنية، وأعمال الحدادة المساندة لمشاريع الدعاية.", images: ["https://i.imgur.com/zRHw0N8.png", "https://i.imgur.com/vC1BF6q.png", "https://i.imgur.com/JwbvsLe.png", "https://i.imgur.com/1wYNwDo.png"] },
    { title: "صيانة وترميم", subtitles: ["تجديد", "تطوير", "اضافة"], description: "نقدم خدمات الصيانة الدورية والترميم للوحات الإعلانية وواجهات الكلادينج لضمان استمرارها بأفضل مظهر.", images: ["https://i.imgur.com/65dxBTN.png", "https://i.imgur.com/L8IwtO5.png"] },
  ];

  const works = [
    { title: "تطوير واجهة فيلا بالنسيم", category: "تلبيس وتطوير الواجهات", imgSrc: "https://i.imgur.com/YrTCdO2.png", description: "عمل تطوير فيلا في حي النسيم، باستخدام كلادينج خشبي بنظام الشرائح مع تلبيس إطارات الشبابيك بكلادينج مقصوص بتقنية الليزر." },
    { title: "لوحة لمطعم دجاج شواية", category: "اللوحات الإعلانية", imgSrc: "https://i.imgur.com/zWUhCEc.jpg", description: "تصنيع وتركيب لوحة حروف بارزة مضيئة لمطعم 'دجاج شواية'، مع خلفية من الكلادينج لإبراز العلامة التجارية وجذب الزبائن." },
    { title: "لافتة أرض فضاء", category: "الأسوار والهياكل", imgSrc: "https://i.imgur.com/JUiqIBd.png", description: "تصميم وتنفيذ لافتة إعلانية متكاملة لأرض فضاء، حل اقتصادي وعملي ومثالي للاستخدامات المؤقتة والدائمة." },
  ];

  const testimonials = [
    { name: "شركة أساس", title: "مقاولات عامة", text: "قمنا بتجديد واجهة للمبنى التجاري الخاص بنا. العمل كان منظم والمواعيد دقيقة. شكرًا لفريق فن الإعلان على الاحترافية.", platformLogo: "https://i.imgur.com/83UcyCK.png" }, // Google
    { name: "م. عبد العزيز", title: "استشاري هندسي", text: "تعاملت معهم في عدة مشاريع لتنفيذ لوحات إعلانية. الجودة جيدة والتركيب يتم بشكل آمن وسريع. أنصح بهم.", platformLogo: "https://i.imgur.com/cUTwVzl.png" }, // WhatsApp
    { name: "متجر أزهار", title: "تجارة التجزئة", text: "اللوحة الجديدة للمحل أعطت هوية مميزة للمكان. التصميم كان بسيط وجميل. سعيد جدًا بالنتيجة النهائية.", platformLogo: "https://i.imgur.com/2s2XobD.png" }, // Instagram
    { name: "مطعم ركن الشام", title: "قطاع الأغذية", text: "خدمة جيدة وأسعارهم منافسة. تم تسليم اللوحة في الوقت المتفق عليه. عمل متقن.", platformLogo: "https://i.imgur.com/83UcyCK.png" }, // Google
    { name: "خالد السالم", title: "مالك عقار", text: "ركبت كلادينج لواجهة العمارة السكنية. الشكل النهائي كان جيد جدًا وأضاف قيمة للعقار. الضمان على الألوان مطمئن.", platformLogo: "https://i.imgur.com/eN8eB3D.png" }, // Facebook
  ];

  const faqs = [
    { question: "كم يستغرق تنفيذ المشروع؟", answer: "يعتمد على حجم المشروع وتعقيده. بشكل عام، يستغرق التنفيذ من يومين إلى 8 أيام بعد اعتماد التصميم النهائي والمواد." },
    { question: "هل تقدمون ضمانًا على أعمالكم؟", answer: "نعم بالتأكيد. نقدم ضمانًا لمدة عامين (2) على الإضاءة (LED)، وضمانًا لمدة عام (1) على ألوان الطباعة الخارجية مثل البنر والفلكس. أما ألواح الكلادينج، فيصل ضمان ألوانها إلى 15 عامًا وهو مقدم مباشرة من المصنع." },
    { question: "ما هي مناطق تغطيتكم؟", answer: "نحن نخدم مدينة الرياض وجميع المناطق المحيطة بها. لمشاريع خارج هذا النطاق، يرجى التواصل معنا لبحث إمكانية التنفيذ." },
    { question: "هل يمكنني رؤية التصميم قبل البدء بالتنفيذ؟", answer: "بالتأكيد. نقوم بإنشاء تصميم ثلاثي الأبعاد (3D) للمشروع لعرضه على العميل وأخذ موافقته الكاملة قبل البدء بأي أعمال تنفيذية، لضمان تطابق النتائج مع توقعاتكم." },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            <Link href="#" className="flex items-center gap-3" prefetch={false}>
              <div>
                <span className="text-2xl font-bold text-white">فن الإعلان</span>
                <span className="block text-xs text-gray-400">مقاولات محدودة</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors">الرئيسية</Link>
              <Link href="#services" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors">خدماتنا</Link>
              <Link href="#our-work" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors">أعمالنا</Link>
              <Link href="#testimonials" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors">الشهادات</Link>
              <Link href="#faq" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors">الأسئلة الشائعة</Link>
              <Link href="#contact" className="text-base font-medium text-gray-300 hover:text-yellow-400 transition-colors">اتصل بنا</Link>
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
              <Link href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">الشهادات</Link>
              <Link href="#faq" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">الأسئلة الشائعة</Link>
              <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-yellow-400 transition-colors">اتصل بنا</Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center text-center bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542871793-1c39a82d7335?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 container">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold animated-gradient-text pb-4 leading-snug md:leading-relaxed">
              واجهات فريدة<br/>ولوحات تترك أثراً
            </h1>
            <p className="mt-8 max-w-4xl mx-auto text-xl sm:text-2xl text-gray-200">
               نحن شركاؤك في النجاح. نقدم حلولاً مبتكرة تضمن تميز علامتك التجارية في قلب الرياض.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link href="#services" className="inline-flex h-14 items-center justify-center rounded-lg px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold animate-shadow-gold">اكتشف خدماتنا</Link>
              <Link href="#our-work" className="inline-flex h-14 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-10 text-xl font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20">شاهد أعمالنا</Link>
            </div>
          </div>
        </section>

        <AnimatedSection id="services" className="py-24 sm:py-32 bg-gray-800 overflow-hidden">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">خدماتنا المتكاملة</h2>
              <p className="mt-6 text-xl text-gray-400">من الفكرة إلى التنفيذ، نقدم حلولاً إبداعية لتحديث الواجهات وتصميم كافة أنواع اللوحات الإعلانية.</p>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {services.map((service, index) => <ServiceCard key={index} {...service} />)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="our-work" className="py-24 sm:py-32 bg-gray-900 overflow-hidden">
          <div className="container">
             <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">من أعمالنا</h2>
              <p className="mt-6 text-xl text-gray-400">نفخر بتقديم أعمال استثنائية تعكس شغفنا بالجودة والابتكار. تصفح بعض من مشاريعنا.</p>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {works.map((work, index) => <WorkCard key={index} {...work} />)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="about-us" className="py-24 sm:py-32 bg-gray-800">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="max-w-xl">
                        <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">خبرتنا في خدمتكم</h2>
                        <p className="mt-8 text-xl text-gray-300 leading-relaxed">في "فن الإعلان"، نجمع بين سنوات من الخبرة وشغف بالإبداع. انطلقنا من الرياض لنقدم حلولاً متكاملة في عالم الدعاية والإعلان والمقاولات، مع التزام تام بأعلى معايير الجودة.</p>
                        <p className="mt-8 text-xl text-gray-300 leading-relaxed">فريقنا مكون من محترفين يعملون لتحويل رؤية عملائنا إلى حقيقة ملموسة تترك بصمة مميزة. نؤمن بأن كل مشروع هو فرصة لتقديم عمل فني يليق بعملائنا.</p>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image src="https://i.imgur.com/8eTDB7o.png" layout="fill" objectFit="cover" alt="فريق عمل فن الإعلان" className="transform scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                </div>
            </div>
        </AnimatedSection>

        <AnimatedSection id="testimonials" className="py-24 sm:py-32 bg-gray-900 overflow-hidden">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">آراء موثوقة</h2>
              <p className="mt-6 text-xl text-gray-400">شهادات عملائنا هي أساس سمعتنا. نفخر بثقتهم ونسعى دائمًا لتقديم الأفضل.</p>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => <TestimonialCard key={index} {...testimonial} />)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="faq" className="py-24 sm:py-32 bg-gray-800">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">أسئلة شائعة</h2>
              <p className="mt-6 text-xl text-gray-400">لدينا إجابات لأكثر الأسئلة شيوعًا. إذا لم تجد سؤالك هنا، فلا تتردد في التواصل معنا.</p>
            </div>
            <div className="mt-20 max-w-4xl mx-auto">
              {faqs.map((faq, index) => <FaqItem key={index} {...faq} />)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="py-24 sm:py-40 bg-gray-900">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gold-gradient bg-clip-text text-transparent pb-4">تواصل معنا</h2>
              <p className="mt-6 text-xl text-gray-400">هل لديك مشروع جديد؟ نحن هنا لمساعدتك. تواصل معنا اليوم للحصول على استشارة مجانية.</p>
            </div>
            <div className="mt-20 grid lg:grid-cols-2 gap-16">
              <div className="bg-gray-800 rounded-2xl p-10 border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-8">أرسل لنا رسالة</h3>
                <form action={dispatch} className="space-y-6">
                  <div>
                    <input type="text" name="name" id="name" placeholder="الاسم الكامل" className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    {state.errors?.name && <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>}
                  </div>
                  <div>
                    <input type="tel" name="phone" id="phone" placeholder="رقم الجوال (مثال: 05xxxxxxxxx)" className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    {state.errors?.phone && <p className="mt-2 text-sm text-red-500">{state.errors.phone[0]}</p>}
                  </div>
                  <div>
                    <textarea name="message" id="message" rows={4} placeholder="اكتب رسالتك هنا..." className="w-full bg-gray-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                    {state.errors?.message && <p className="mt-2 text-sm text-red-500">{state.errors.message[0]}</p>}
                  </div>
                  <div><SubmitButton /></div>
                  {state.message && <p className={`mt-4 text-center text-lg ${state.success ? 'text-green-400' : 'text-red-500'}`}>{state.message}</p>}
                </form>
              </div>
              <div className="space-y-10">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">معلومات الاتصال</h3>
                  <div className="space-y-4 text-lg text-gray-300">
                    <p className="flex items-start gap-4"><MapPinIcon className="w-6 h-6 text-yellow-400 mt-1" /><a href="https://maps.app.goo.gl/2yJNfnqTA1hnAycV9" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><span>مجمع الوسط التجاري, حي الصالحية</span><span className="block text-sm text-gray-500">(انقر للانتقال للموقع)</span></a></p>
                    <p className="flex items-center gap-4"><PhoneIcon className="w-6 h-6 text-yellow-400" /><a href="tel:0557517792" className="hover:text-yellow-400">0557517792</a></p>
                    <p className="flex items-center gap-4"><MailIcon className="w-6 h-6 text-yellow-400" /><a href="mailto:artadvertising211@gmail.com" className="hover:text-yellow-400">artadvertising211@gmail.com</a></p>
                  </div>
                </div>
                <div className="h-96 w-full rounded-2xl overflow-hidden border border-white/10">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3623.674982188236!2d46.68541997536764!3d24.73819837798781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDQ0JzE3LjUiTiA0NsKwNDEnMTYuOCJF!5e0!3m2!1sen!2ssa!4v1716215339396!5m2!1sen!2ssa" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="grayscale-[80%] invert-[100%] contrast-[1.2]"></iframe>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
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
