'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ServiceCardProps {
  title: string;
  description: string;
  images: string[];
  subtitles?: string[]; // الخاصية الجديدة
}

const ServiceCard = ({ title, description, images, subtitles }: ServiceCardProps) => {
  return (
    <div className="bg-[#181818] rounded-2xl overflow-hidden transform hover:-translate-y-4 transition-transform duration-300 border border-white/10 shadow-2xl hover:shadow-gold/20 flex flex-col">
      <div className="relative h-56 w-full group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full service-swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                alt={`${title} - image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="p-8 flex-grow">
        <h3 className="text-3xl font-bold text-white">{title}</h3>
        {/* عرض التفاصيل الإضافية */}
        {subtitles && (
          <p className="mt-3 text-base text-yellow-400 font-medium">
            {subtitles.join(' - ')}
          </p>
        )}
        <p className="mt-5 text-lg text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
