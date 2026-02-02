'use client';
import Image from 'next/image';

const RealFacebookIcon = ({ className }: { className?: string }) => {
  return (
    <Image 
      src="https://i.imgur.com/FN7REzx.png" 
      alt="Facebook Icon" 
      width={32} 
      height={32} 
      className={className}
    />
  );
};

export default RealFacebookIcon;
