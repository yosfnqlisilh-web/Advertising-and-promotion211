'use client';

import React, { useState, useEffect } from 'react';
import './AnimatedLogo.css'; // نستورد ملف الأنماط هنا

const AnimatedLogo = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1);
    }, 12000); // إعادة تشغيل الحركة كل 12 ثانية

    return () => clearInterval(interval);
  }, []);

  return (
    // تم تعديل الحجم ليتناسب مع شريط الرأس بشكل متوازن
    <div key={key} className="w-16 h-16 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* تمت إضافة مجموعة لتوسيط المحتوى بالكامل */}
            <g transform="translate(-4, -4)">
              {/* 1. الجزء الكبير (الفاء التجريدية) */}
              <g className="part-large">
                  <path d="M22 22 H78 V45 H48 V75 H22 Z" fill="#ff9000" />
              </g>
              
              {/* 2. الجزء الصغير (المربع السفلي) */}
              <g className="part-small">
                  <rect x="52" y="52" width="34" height="34" rx="7" fill="#ff9000" />
                  
                  {/* 3. كلمة فن (الأبيض الصريح) */}
                  <text x="69" y="75" className="text-element" fontFamily="Cairo, sans-serif" fontSize="16" fontWeight="900" fill="#ffffff" textAnchor="middle">
                      فن
                  </text>
              </g>
            </g>
        </svg>
    </div>
  );
};

export default AnimatedLogo;
