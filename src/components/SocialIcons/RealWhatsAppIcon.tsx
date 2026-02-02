
import Image from 'next/image';

const RealWhatsAppIcon = ({ className }: { className?: string }) => (
  <Image
    src="https://i.imgur.com/gVIm2tq.png" // URL for a high-quality WhatsApp logo
    alt="WhatsApp Logo"
    width={40}
    height={40}
    className={className}
  />
);

export default RealWhatsAppIcon;
