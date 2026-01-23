
'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

type PropType = {
  slides: { src: string; alt: string; title: string }[]
  options?: any
}

const OurWorkCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  ])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            <div className="relative group aspect-video rounded-2xl overflow-hidden shadow-lg">
                <Image
                  className="embla__slide__img group-hover:scale-110 transition-transform duration-500"
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-300 flex items-end p-8">
                  <h3 className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-6 transition-all duration-500">
                    {slide.title}
                  </h3>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurWorkCarousel
