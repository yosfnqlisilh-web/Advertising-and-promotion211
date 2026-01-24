'use client'
import React, { ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel' // Corrected import from the core package
import Autoplay from 'embla-carousel-autoplay'

type PropType = {
  children: ReactNode
  options?: EmblaOptionsType
}

export const EmblaCarousel: React.FC<PropType> = ({ children, options }) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {React.Children.map(children, (child) => (
          <div className="embla__slide">{child}</div>
        ))}
      </div>
    </div>
  )
}
