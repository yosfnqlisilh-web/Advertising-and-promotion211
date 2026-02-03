'use client';

import { PhoneIcon, XIcon } from "./icons";
import { FaWhatsapp } from "react-icons/fa";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  if (!isOpen) return null;

  const phoneNumber = "+966557517792";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}`;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-[90%] max-w-md m-8 p-8 relative border-2 border-yellow-400/50 transform animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-125">
          <XIcon className="w-8 h-8" />
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-6">تواصل معنا مباشرة</h2>
          <p className="text-gray-300 text-lg mb-10">نحن هنا لمساعدتك. اختر طريقة التواصل التي تناسبك.</p>
          <div className="space-y-6">
            <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-4 w-full h-16 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 text-white text-2xl font-semibold shadow-lg transform hover:-translate-y-1 border border-white/20">
              <PhoneIcon className="w-7 h-7 text-yellow-400" />
              <span>اتصال مباشر</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 w-full h-16 rounded-lg bg-green-500 hover:bg-green-400 transition-all duration-300 text-white text-2xl font-semibold shadow-lg transform hover:-translate-y-1 border border-white/20">
              <FaWhatsapp className="w-8 h-8" />
              <span>محادثة واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
