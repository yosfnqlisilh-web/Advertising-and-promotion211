'use client';
import Image from 'next/image';

const RealGoogleMapsIcon = ({ className }: { className?: string }) => {
  return (
    <Image 
      src="https://i.imgur.com/Zxn3PKC.png" 
      alt="Google Maps Icon" 
      width={32} 
      height={32} 
      className={className}
    />
  );
};

export default RealGoogleMapsIcon;
