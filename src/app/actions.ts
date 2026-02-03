'use server'

import { z } from 'zod';
import { Resend } from 'resend';

const contactFormSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  phone: z.string().regex(/^05[0-9]{8}$/, { message: 'الرجاء إدخال رقم جوال سعودي صحيح.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل.' })
});

const getResend = () => {
    const key = process.env.RESEND_API_KEY;
    if (!key) return null;
    return new Resend(key);
};

export async function submitContactForm(prevState: any, formData: FormData) {
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
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'artadvertising211@gmail.com',
      subject: `رسالة جديدة من موقع فن الإعلان - من ${name}`,
      html: `<div dir="rtl"><h2>رسالة جديدة</h2><p>الاسم: ${name}</p><p>الجوال: ${phone}</p><p>الرسالة: ${message}</p></div>`,
    });
    return { message: 'تم الإرسال بنجاح!', success: true, errors: {} };
  } catch (error) {
    return { message: 'خطأ في الإرسال.', success: false, errors: {} };
  }
}

/**
 * Universal Gemini Caller - Switches between versions and models automatically
 */
export async function getGeminiResponse(userPrompt: string) {
    const apiKey = (process.env.GOOGLE_GENERATIVE_AI_API_KEY || "").trim();
    if (!apiKey) return "يا هلا بك! مفتاح الذكاء الاصطناعي مفقود.";

    const systemContext = `أنت 'فن' مساعد مؤسسة فن الإعلان بالرياض. 
    الأسعار: الحروف البارزة 350، الاستيكر 35، الأسوار 150-250، الكلادينج 160-280. 
    تحدث بلهجة سعودية ودودة ومختصرة.`;

    // Strategy: Try multiple endpoints and models
    const endpoints = [
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`
    ];

    for (const url of endpoints) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${systemContext}\n\nالسؤال: ${userPrompt}` }] }]
                })
            });

            const data = await response.json();
            if (response.ok && data.candidates && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (e) {
            console.error(`Failed at ${url}`);
        }
    }

    return "يا هلا بك! حالياً أواجه ضغط في النظام، تقدر تواصل معنا واتساب وأبشر بسعدك: 0557517792";
}
