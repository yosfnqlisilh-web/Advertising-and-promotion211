'use client';

import Image from "next/image";
import { QuoteIcon } from './icons';

type TestimonialCardProps = {
  name: string;
  title: string;
  text: string;
  platformLogo: string;
};

const TestimonialCard = ({ name, title, text, platformLogo }: TestimonialCardProps) => {
  return (
    <div className="h-full bg-gray-800 p-8 rounded-2xl border border-white/10 shadow-lg flex flex-col justify-between">
      <div>
        <QuoteIcon className="w-12 h-12 text-yellow-400 mb-6" />
        <p className="text-lg text-gray-300 leading-relaxed">&ldquo;{text}&rdquo;</p>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
          <Image src={platformLogo} alt={`${name} on ${title}`} width={32} height={32} />
        </div>
        <div>
          <p className="font-bold text-lg text-white">{name}</p>
          <p className="text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
