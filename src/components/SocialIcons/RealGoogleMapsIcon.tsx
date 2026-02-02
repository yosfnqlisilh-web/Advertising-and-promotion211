
import Image from 'next/image';

const RealGoogleMapsIcon = ({ className }: { className?: string }) => (
  <Image
    src="https://i.imgur.com/nJ2yB4B.png" // URL for a high-quality Google Maps logo
    alt="Google Maps Logo"
    width={40}
    height={40}
    className={className}
  />
);

export default RealGoogleMapsIcon;
