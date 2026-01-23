
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactFormSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  phone: z.string().regex(/^05[0-9]{8}$/, { message: 'يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل.' }),
});

const resend = new Resend('re_MQRq3csa_DqKAiDdEQgcpho8MEzS5Ldmm');

export async function submitContactForm(prevState, formData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'فشل التحقق من البيانات.',
      success: false,
    };
  }

  const { name, phone, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['yosfnqlisilh@gmail.com'],
        subject: `رسالة جديدة من ${name} | موقع فن الإعلان`,
        html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #0A0A0A; border-radius: 10px; overflow: hidden; border: 1px solid #333;">
                <div style="background-color: #D4AF37; padding: 20px; text-align: center;">
                    <h1 style="color: #0A0A0A; margin: 0; font-size: 24px;">رسالة جديدة من عميل</h1>
                </div>
                <div style="padding: 30px; color: #E0E0E0;">
                    <p style="font-size: 18px; margin-bottom: 20px;"><strong>الاسم:</strong> ${name}</p>
                    <p style="font-size: 18px; margin-bottom: 20px;"><strong>رقم الجوال:</strong> <a href="tel:${phone}" style="color: #D4AF37; text-decoration: none; text-align: right; direction: ltr;">${phone}</a></p>
                    <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;">
                    <h2 style="color: #D4AF37; font-size: 20px; border-bottom: 2px solid #D4AF37; padding-bottom: 5px; margin-bottom: 15px;">محتوى الرسالة:</h2>
                    <div style="background-color: #1A1A1A; padding: 20px; border-radius: 5px; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">
                        ${message}
                    </div>
                </div>
                <div style="background-color: #1A1A1A; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                    <p>تم إرسال هذه الرسالة من خلال نموذج التواصل في موقع "فن الإعلان"</p>
                </div>
            </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return {
        message: `فشل إرسال الرسالة. الخطأ: ${error.message}`,
        success: false,
      };
    }

    return {
      message: 'شكرًا لك! تم إرسال رسالتك بنجاح وسنتواصل معك قريبًا.',
      success: true,
      errors: {},
    };
  } catch (error) {
    console.error('Server Action Error:', error);
    return {
      message: 'حدث خطأ غير متوقع أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
      success: false,
    };
  }
}
