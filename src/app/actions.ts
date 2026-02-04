'use server'

import { z } from 'zod';
import { Resend } from 'resend';

// 1. إعداد التحقق من البيانات
const contactFormSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  phone: z.string().regex(/^05[0-9]{8}$/, { message: 'الرجاء إدخال رقم جوال سعودي صحيح.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل.' })
});

export interface FormState {
    message: string;
    errors?: {
        name?: string[];
        phone?: string[];
        message?: string[];
    };
    success: boolean;
}

// Safe Resend Init
const getResend = () => {
    const key = process.env.RESEND_API_KEY;
    if (!key) return null;
    return new Resend(key);
};

// 2. دالة إرسال الإيميلات (Resend) - Updated to new destination email
export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const resend = getResend();
  if (!resend) return { message: 'خدمة الإيميلات غير مفعلة.', success: false, errors: {} };

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
    if (!process.env.RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY');

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'yosfnqlisilh@gmail.com', // Updated destination
      subject: `رسالة جديدة من موقع فن الإعلان - من ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FBBF24;">رسالة جديدة عبر الموقع</h2>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>رقم الجوال:</strong> ${phone}</p>
          <p><strong>الرسالة:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    });
    return { message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.', success: true, errors: {} };
  } catch (error) {
    console.error("Email Error:", error);
    return { message: 'عفوًا، حدث خطأ أثناء إرسال الرسالة.', success: false, errors: {} };
  }
}

interface GeminiModel {
    name: string;
    supportedGenerationMethods: string[];
}

// 3. دالة البوت الذكي (Gemini) - Fixed to prevent 404 and use stable models
export async function getGeminiResponse(userPrompt: string): Promise<string> {
    const apiKey = (process.env.GOOGLE_GENERATIVE_AI_API_KEY || "").trim();
    if (!apiKey) return "المفتاح مفقود.";

    const systemContext = `أنت المساعد الذكي 'فن' لمؤسسة فن الإعلان بالرياض. متخصص في الكلادينج واللوحات. 
    الأسعار: الحروف البارزة 350 ريال، الاستيكر 35 ريال، الأسوار 150-250 ريال، الكلادينج 160-280 ريال.
    الضمان: 15 سنة على الكلادينج. الموقع: نخدم كل أحياء الرياض. تحدث بلهجة سعودية ودودة.`;

    try {
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const listData = await listRes.json();
        const availableModels: GeminiModel[] = listData.models || [];

        const targetModel = availableModels.find((m) => m.name.includes("gemini-1.5-flash") && m.supportedGenerationMethods.includes("generateContent"))
                           || availableModels.find((m) => m.supportedGenerationMethods.includes("generateContent"));

        if (!targetModel) return "يا هلا بك! جاري تحديث أنظمة الذكاء الاصطناعي، تواصل معنا واتساب وأبشر بسعدك.";

        const url = `https://generativelanguage.googleapis.com/v1beta/${targetModel.name}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `${systemContext}\n\nسؤال العميل: ${userPrompt}` }] }] })
        });

        const data = await response.json();
        if (response.ok && data.candidates) return data.candidates[0].content.parts[0].text;
        
        return "معليش يا غالي، حصل عندي التماس بسيط، جرب تسألني بعد دقيقة.";

    } catch (error) {
        console.error(error);
        return "يا هلا بك! فيه مشكلة في الاتصال، كلمنا واتساب وأبشر باللي يرضيك.";
    }
}
