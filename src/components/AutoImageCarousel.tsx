import React, { useState } from "react";

interface AutoImageCarouselProps {
  images: { src: string; alt: string }[];
}

export const AutoImageCarousel: React.FC<AutoImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {images.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute top-0 left-0 w-full h-full object-cover object-top md:object-center rounded-[32px] border border-border-cream shadow-whisper transition-all duration-1000 grayscale hover:grayscale-0 cursor-pointer ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } hover:brightness-110 hover:saturate-150`}
          style={{ transitionProperty: "opacity, filter, z-index", objectPosition: "center 18%" }}
        />
      ))}
    </div>
  );
};
