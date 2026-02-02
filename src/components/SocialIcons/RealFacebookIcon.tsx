
import Image from 'next/image';

const RealFacebookIcon = ({ className }: { className?: string }) => (
  <Image
    src="https://i.imgur.com/2V12F3D.png" // URL for a high-quality, white Facebook logo
    alt="Facebook Logo"
    width={40}
    height={40}
    className={className}
  />
);

export default RealFacebookIcon;
