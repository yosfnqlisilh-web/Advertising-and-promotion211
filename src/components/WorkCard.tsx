import Image from 'next/image';

interface WorkCardProps {
  title: string;
  category: string;
  imgSrc: string;
  description: string; // Add description prop
}

export default function WorkCard({ title, category, imgSrc, description }: WorkCardProps) {
  return (
    <div className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
      <div className="aspect-w-4 aspect-h-3">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <span className="text-xs sm:text-sm bg-yellow-400/10 text-yellow-300 px-3 py-1 rounded-full">{category}</span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">{title}</h3>
        <p className="text-sm sm:text-base text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
}
