'use server'

import { z } from 'zod';
import { Resend } from 'resend';

// Schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  phone: z.string().regex(/^05[0-9]{8}$/, { message: 'الرجاء إدخال رقم جوال سعودي صحيح.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل.' })
});

// State for contact form
export type FormState = {
  message: string;
  errors?: { name?: string[]; phone?: string[]; message?: string[]; };
  success: boolean;
};

const resend = new Resend(process.env.RESEND_API_KEY); // Use environment variable

// Server Action for submitting contact form
export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    message: formData.get('message')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'فشل التحقق من البيانات.',
      success: false,
    };
  }

  try {
    const { name, phone, message } = validatedFields.data;
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'artadvertising211@gmail.com',
      subject: `رسالة جديدة من موقع فن الإعلان - من ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>رسالة جديدة عبر موقعكم الإلكتروني</h2>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>رقم الجوال:</strong> ${phone}</p>
          <p><strong>الرسالة:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });
    return { message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.', success: true, errors: {} };
  } catch (error) {
    console.error("Email sending error:", error);
    return { message: 'عفوًا، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', success: false, errors: {} };
  }
}

// Server Action for Chatbot
export async function getGeminiResponse(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "هنا تضع المفتاح الخاص بك") {
    return "عفوًا، يبدو أن مفتاح API غير مفعّل. الرجاء تزويد المطور بالمفتاح الصحيح لتفعيل الخدمة.";
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: "أنت مساعد ذكي اسمك 'فن' لموقع 'فن الإعلان'. تحدث باللهجة السعودية الودودة (مثل: هلا بك، أبشر، من عيوني، لا تشيل هم). وجه الزوار دائماً لطلب الخدمات عبر الإيميل admin@fan-alelan.com أو زيارة صفحة فيسبوك أو قوقل ماب. خلك سريع وبسيط ومحفز." }] }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google API Error:", errorData);
      return "معليش، واجهتني مشكلة في الاتصال بالذكاء الاصطناعي. جرب مرة ثانية.";
    }

    const data = await response.json();
    // Handle cases where the response might be empty or blocked
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        console.error("Invalid response structure from API:", data);
        return "والله ما أدري وش أقول، عطني سؤال ثاني.";
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Server Action Error:", error);
    return "معليش حصل خطأ فني في السيرفر، جرب تسألني بعد شوي!";
  }
}
