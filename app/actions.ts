'use server'

import { z } from 'zod';
import { Resend } from 'resend';

const contactFormSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  phone: z.string().regex(/^05[0-9]{8}$/, { message: 'الرجاء إدخال رقم جوال سعودي صحيح.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل.' })
});

// Using environment variable for security
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(prevState: any, formData: FormData) {
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
    
    if (!process.env.RESEND_API_KEY) {
       throw new Error('Missing RESEND_API_KEY');
    }

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
    return { message: 'عفوًا، حدث خطأ أثناء إرسال الرسالة. يرجى التأكد من إعداد مفتاح API بشكل صحيح.', success: false, errors: {} };
  }
}
