'use client';

import Image from 'next/image';
import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom';

// Import data
import { works, testimonials, faqs } from '../lib/data';

// Import components and icons
import { MailIcon, PhoneIcon, MapPinIcon } from "../components/icons";
import RealFacebookIcon from "../components/SocialIcons/RealFacebookIcon";
import RealGoogleMapsIcon from "../components/SocialIcons/RealGoogleMapsIcon";
import RealWhatsAppIcon from "../components/SocialIcons/RealWhatsAppIcon";
import WorkCard from "../components/WorkCard";
import AnimatedSection from "../components/AnimatedSection";
import TestimonialCard from "../components/TestimonialCard";
import FaqItem from "../components/FaqItem";
import NewChatbot from "../components/NewChatbot";

import { submitContactForm, FormState } from './actions';
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
  
  const initialState: FormState = { 
    message: "", 
    errors: undefined, 
    success: false 
  };
  const [state, dispatch] = useFormState(submitContactForm, initialState);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans">
      
      <main className="flex-1">
        <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center text-center bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542871793-1c39a82d7335?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 container">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold animated-gradient-text pb-4 leading-snug md:leading-relaxed">
              تصميم لوحات محلات<br/>وحروف بارزة تترك أثراً
            </h1>
            <p className="mt-8 max-w-4xl mx-auto text-xl sm:text-2xl text-gray-200">
               في فن الإعلان، نقدم حلولاً مبتكرة تضمن تميز علامتك التجارية، من تصميم لوحات إعلانية فريدة إلى تنفيذ واجهات كلادينج احترافية.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link href="/services" className="inline-flex h-14 items-center justify-center rounded-lg px-10 text-xl transition-all shadow-gold hover:shadow-gold-hover bg-gold-gradient text-black font-bold animate-shadow-gold">اكتشف خدماتنا</Link>
              <Link href="#our-work" className="inline-flex h-14 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-10 text-xl font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20">شاهد أعمالنا</Link>
            </div>
          </div>
        </section>

        <AnimatedSection id="our-work" className="py-24 sm:py-32 bg-gray-900 overflow-hidden">
          <div className="container">
             <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight animated-gradient-text pb-4">من أعمالنا</h2>
              <p className="mt-6 text-xl text-gray-400">نفخر بتقديم أعمال استثنائية تعكس شغفنا بالجودة والابتكار. تصفح بعض من مشاريعنا في تصميم وتركيب لوحات المحلات والحروف البارزة.</p>
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
                        <h2 className="text-5xl sm:text-6xl font-bold tracking-tight animated-gradient-text pb-4">خبرتنا في خدمتكم</h2>
                        <p className="mt-8 text-xl text-gray-300 leading-relaxed">في &quot;فن الإعلان&quot;، نجمع بين سنوات من الخبرة وشغف بالإبداع. انطلقنا من الرياض لنقدم حلولاً متكاملة تشمل تصميم لوحات إعلانية مبتكرة، وتنفيذ واجهات كلادينج، وتركيب حروف بارزة.</p>
                        <p className="mt-8 text-xl text-gray-300 leading-relaxed">فريقنا مكون من محترفين يعملون لتحويل رؤية عملائنا إلى حقيقة ملموسة تترك بصمة مميزة، سواء في لوحات المحلات أو المشاريع الكبرى.</p>
                    </div>
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image src="https://i.imgur.com/8eTDB7o.png" layout="fill" objectFit="cover" alt="فريق عمل فن الإعلان يصمم لوحات محلات" className="transform scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                </div>
            </div>
        </AnimatedSection>

        <AnimatedSection id="testimonials" className="py-24 sm:py-32 bg-gray-900 overflow-hidden">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight animated-gradient-text pb-4">آراء موثوقة</h2>
              <p className="mt-6 text-xl text-gray-400">شهادات عملائنا هي أساس سمعتنا. نفخر بثقتهم في جودة لوحات المحلات وخدماتنا الإعلانية.</p>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => <TestimonialCard key={index} {...testimonial} />)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="faq" className="py-24 sm:py-32 bg-gray-800">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight animated-gradient-text pb-4">أسئلة شائعة</h2>
              <p className="mt-6 text-xl text-gray-400">لدينا إجابات للأسئلة حول تصميم اللوحات، أسعار الحروف البارزة، وكل ما يخص الدعاية والإعلان.</p>
            </div>
            <div className="mt-20 max-w-4xl mx-auto">
              {faqs.map((faq, index) => <FaqItem key={index} {...faq} />)}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="py-24 sm:py-40 bg-gray-900">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight animated-gradient-text pb-4">تواصل معنا</h2>
              <p className="mt-6 text-xl text-gray-400">هل لديك مشروع لوحة محل أو تحتاج تصميم لوحة إعلانية؟ نحن هنا لمساعدتك. تواصل معنا اليوم للحصول على استشارة مجانية.</p>
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
                    <p className="flex items-start gap-4"><MapPinIcon className="w-6 h-6 text-yellow-400 mt-1" /><a href="https://share.google/yok3tFEnIDCu8AZbY" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><span>مجمع الوسط التجاري, حي الصالحية</span><span className="block text-sm text-gray-500">(انقر للانتقال للموقع)</span></a></p>
                    <p className="flex items-center gap-4"><PhoneIcon className="w-6 h-6 text-yellow-400" /><a href="tel:0557517792" className_="hover:text-yellow-400">0557517792</a></p>
                    <p className="flex items-center gap-4"><MailIcon className="w-6 h-6 text-yellow-400" /><a href="mailto:admin@fan-alelan.com" className="hover:text-yellow-400">admin@fan-alelan.com</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-gray-800 py-16 border-t border-white/10">
        <div className="container text-center">
            <div className="flex justify-center gap-8 mb-8">
              <a href="https://www.facebook.com/profile.php?id=61587226595703" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                <RealFacebookIcon className="w-8 h-8" />
              </a>
              <a href="https://share.google/yok3tFEnIDCu8AZbY" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                <RealGoogleMapsIcon className="w-8 h-8" />
              </a>
              <a href="https://wa.me/966557517792" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110">
                <RealWhatsAppIcon className="w-8 h-8" />
              </a>
            </div>
            <p className="text-lg text-gray-500" suppressHydrationWarning>&copy; {new Date().getFullYear()} فن الإعلان. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      <NewChatbot />
    </div>
  );
}
