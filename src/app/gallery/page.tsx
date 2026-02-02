'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { works } from '../../lib/data';
import AnimatedSection from '../../components/AnimatedSection';
import { ArrowLeftIcon } from '../../components/icons';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['عرض الكل', ...new Set(works.map(work => work.category))];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('عرض الكل');

  const filteredWorks = selectedCategory === 'عرض الكل' 
    ? works 
    : works.filter(work => work.category === selectedCategory);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <AnimatedSection id="gallery-header">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl sm:text-7xl font-extrabold animated-gradient-text pb-4">
              معرض أعمالنا
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              نفخر بكل مشروع نكمله. هنا يمكنك تصفح مجموعة متنوعة من أعمالنا في مجالات الكلادينج، الحروف البارزة، واللوحات الإعلانية التي قمنا بتنفيذها لعملائنا في الرياض ومختلف أنحاء المملكة.
            </p>
            <div className="mt-12">
                <Link href="/" className="group inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 transform hover:-translate-y-1">
                    <ArrowLeftIcon className="w-6 h-6 ml-3 transform transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>العودة إلى الرئيسية</span>
                </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="gallery-filters" className="mt-24 mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 
                  ${selectedCategory === category 
                    ? 'bg-gold-gradient text-black shadow-lg shadow-yellow-400/30' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredWorks.map((work, index) => (
              <motion.div
                key={`${work.imgSrc}-${index}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="group relative block bg-gray-800 rounded-2xl overflow-hidden border border-white/10 aspect-w-1 aspect-h-1"
              >
                <Image
                  src={work.imgSrc}
                  alt={work.title}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">{work.title}</h3>
                  <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0">{work.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
