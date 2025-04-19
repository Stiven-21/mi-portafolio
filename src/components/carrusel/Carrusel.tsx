"use client";
import React, { useRef, useState } from "react";
import { Icons } from "../icons";
import { useIsMobile } from "@/hooks/use-mobile";

interface CarruselProps {
  children: React.ReactNode[];
}

const Carrusel: React.FC<CarruselProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const cardsPerBlock = isMobile
    ? 2
    : window.innerWidth >= 768 && window.innerWidth < 1024
    ? 3
    : 6;

  const scrollLeft = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth / cardsPerBlock;
      containerRef.current.scroll({
        left: containerRef.current.scrollLeft - cardWidth * cardsPerBlock,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth / cardsPerBlock;
      containerRef.current.scroll({
        left: containerRef.current.scrollLeft + cardWidth * cardsPerBlock,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative px-12"
      onTouchStart={(e) => {
        setTouchStart(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (touchStart === null || containerRef.current === null) return;
        const touchMove = e.touches[0].clientX;
        const touchDiff = touchStart - touchMove;

        containerRef.current.scrollLeft += touchDiff;
        setTouchStart(touchMove);
      }}
      onTouchEnd={() => {
        setTouchStart(null);
      }}
      onTouchCancel={() => {
        setTouchStart(null);
      }}
    >
      <button
        className="absolute cursor-pointer left-0 top-1/2 transform -translate-y-1/2 bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-300 hover:text-slate-50 dark:hover:text-slate-900 rounded-full p-2"
        onClick={scrollLeft}
      >
        <Icons.chevronLeft className="h-6 w-6" />
      </button>
      <div
        className="overflow-hidden whitespace-nowrap"
        ref={containerRef}
      >
        <div className="flex flex-nowrap gap-4 py-4 transition-transform duration-300 ease-in-out">
          {children.map((child, index) => (
            <div
              key={index}
              className={`inline-block w-full ${
                isMobile ? "sm:w-1/2" : "md:w-1/3 lg:w-1/6"
              } cursor-pointer`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute cursor-pointer right-0 top-1/2 transform -translate-y-1/2 bg-slate-950 dark:bg-slate-100 text-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-300 hover:text-slate-50 dark:hover:text-slate-900 rounded-full p-2"
        onClick={scrollRight}
      >
        <Icons.chevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Carrusel;
