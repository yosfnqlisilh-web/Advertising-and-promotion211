import Image from 'next/image';

interface WorkCardProps {
  title: string;
  category: string;
  imgSrc: string;
}

export default function WorkCard({ title, category, imgSrc }: WorkCardProps) {
  return (
    <div className="group relative block w-full overflow-hidden rounded-2xl border border-white/10">
      <div className="aspect-w-4 aspect-h-3">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <span className="text-sm bg-yellow-400/10 text-yellow-300 px-3 py-1 rounded-full">{category}</span>
        <h3 className="text-2xl font-bold text-white mt-3">{title}</h3>
      </div>
    </div>
  );
}
