'use client';
import Image from 'next/image';

const RealWhatsAppIcon = ({ className }: { className?: string }) => {
  return (
    <Image 
      src="https://i.imgur.com/LPQX7EX.png" 
      alt="WhatsApp Icon" 
      width={32} 
      height={32} 
      className={className}
    />
  );
};

export default RealWhatsAppIcon;
