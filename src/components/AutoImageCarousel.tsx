import React, { useState, useEffect, useCallback } from "react";
import { Pause, Play } from "lucide-react";

interface AutoImageCarouselProps {
  images: { src: string; alt: string }[];
}

export const AutoImageCarousel: React.FC<AutoImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const intervalTime = 3500;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(nextSlide, intervalTime);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const progress = ((current + 1) / images.length) * 100;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
      {images.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute top-0 left-0 w-full h-full object-cover object-top md:object-center rounded-[32px] border border-border-cream shadow-whisper transition-all duration-1000 grayscale hover:grayscale-0 cursor-pointer ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } hover:brightness-110 hover:saturate-150`}
          style={{ transitionProperty: "opacity, filter, z-index", objectPosition: "center 18%" }}
        />
      ))}

      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 z-30 p-2 rounded-full bg-near-black/60 backdrop-blur-sm text-ivory opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-near-black/80 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-terracotta"
        aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>

      <div className="absolute bottom-4 left-4 right-16 z-20">
        <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta transition-all duration-300 ease-linear"
            style={{ width: isPlaying ? `${progress}%` : '0%' }}
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setCurrent(idx); setIsPlaying(false); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${
              idx === current ? "bg-terracotta w-4" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to image ${idx + 1}`}
            aria-current={idx === current ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};
