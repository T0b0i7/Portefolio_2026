import { useEffect, useRef, useCallback } from 'react';

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rAFRef = useRef<number>(0);
  const fadingOutRef = useRef(false);

  const fadeTo = useCallback((target: number, duration: number) => {
    cancelAnimationFrame(rAFRef.current);
    const el = videoRef.current;
    if (!el) return;
    const start = performance.now();
    const startOpacity = parseFloat(el.style.opacity) || 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.style.opacity = String(startOpacity + (target - startOpacity) * progress);
      if (progress < 1) {
        rAFRef.current = requestAnimationFrame(step);
      }
    };
    rAFRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedData = () => {
      video.style.opacity = '0';
      video.play();
      fadeTo(1, FADE_MS);
    };

    const onTimeUpdate = () => {
      if (
        !fadingOutRef.current &&
        video.duration - video.currentTime <= FADE_OUT_LEAD &&
        video.duration - video.currentTime > 0
      ) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      cancelAnimationFrame(rAFRef.current);
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [fadeTo]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
