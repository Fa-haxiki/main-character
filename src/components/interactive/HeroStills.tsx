"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const stills = [
  { src: "/yiqine-1.jpg", alt: "忆秦娥经典剧照 一" },
  { src: "/yiqine-2.jpg", alt: "忆秦娥经典剧照 二" },
  { src: "/yiqine-3.jpg", alt: "忆秦娥经典剧照 三" },
];

export function HeroStills() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stills.length);
    }, 4000); // 每 4 秒自动切换，提供充分的观赏时间

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto flex h-[70vh] w-full max-w-full items-center justify-center overflow-hidden">
      {stills.map((still, index) => {
        const isCurrent = index === currentIndex;
        return (
          <div
            key={still.src}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
              isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={still.src}
              alt={still.alt}
              width={560}
              height={756}
              priority={index === 0} // 第一张优先加载，优化首屏 LCP
              className="max-h-[70vh] w-auto max-w-full object-contain lg:ml-auto lg:mr-8"
            />
          </div>
        );
      })}
    </div>
  );
}
