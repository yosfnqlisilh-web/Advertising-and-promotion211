'use client';

import { useState, useEffect } from 'react';
import { Amiri } from "next/font/google";
import './AnimatedWords.css';

// Initialize the new font
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ['400', '700']
});

const words = ["نخطط...", "نصمم...", "ننفذ بدقة..."];

const AnimatedWords = () => {
  const [index, setIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('fade-in-word');

  useEffect(() => {
    const totalCycleTime = 2500; // Time per word on screen
    const animationDuration = 500; // CSS animation time

    const interval = setInterval(() => {
      setAnimationClass('fade-out-word');

      setTimeout(() => {
        setIndex(prevIndex => (prevIndex + 1) % words.length);
        setAnimationClass('fade-in-word');
      }, animationDuration);

    }, totalCycleTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`inline-block min-w-[150px] text-yellow-400 ${animationClass} ${amiri.className}`}>
      {words[index]}
    </span>
  );
};

export default AnimatedWords;
