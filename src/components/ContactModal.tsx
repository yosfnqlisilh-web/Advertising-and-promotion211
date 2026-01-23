
'use client';

import { PhoneIcon, WhatsappIcon, XIcon } from "./icons";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const phoneNumber = "+966557517792";
  const whatsappMessage = encodeURIComponent("السلام عليكم، لقد تواصلت معكم عبر موقعكم الإلكتروني وأود الاستفسار عن خدماتكم.");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  const phoneLink = `tel:${phoneNumber}`;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" 
      onClick={onClose}
    >
      <div 
        className="bg-[#1c1c1c] rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 border border-white/10" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">تواصل معنا مباشرة</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <XIcon className="w-7 h-7" />
                <span className="sr-only">إغلاق</span>
            </button>
        </div>
        <div className="flex flex-col gap-6">
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 w-full h-16 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <WhatsappIcon className="w-8 h-8" />
            <span>واتساب</span>
          </a>
          <a 
            href={phoneLink}
            className="flex items-center justify-center gap-4 w-full h-16 bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <PhoneIcon className="w-7 h-7" />
            <span>اتصال هاتفي</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
