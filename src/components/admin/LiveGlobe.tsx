import { useEffect, useRef } from "react";
import type { LiveEvent } from "@/types/cms";

type Props = {
  points: LiveEvent[];
};

function projectToSphere(lat: number, lng: number, radius: number) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  return {
    x: radius * Math.cos(latRad) * Math.sin(lngRad),
    y: radius * Math.sin(latRad),
    z: radius * Math.cos(latRad) * Math.cos(lngRad),
  };
}

export function LiveGlobe({ points }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * devicePixelRatio);
      canvas.height = Math.floor(rect.height * devicePixelRatio);
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      frame += 0.004;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.35;

      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(cx - radius * 0.4, cy - radius * 0.4, radius * 0.2, cx, cy, radius * 1.2);
      grad.addColorStop(0, "rgba(242,148,121,0.45)");
      grad.addColorStop(1, "rgba(17,24,39,0.95)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = -2; i <= 2; i += 1) {
        const r = radius * Math.cos((i * Math.PI) / 10);
        ctx.beginPath();
        ctx.arc(cx, cy, Math.abs(r), 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.stroke();
      }

      const maxPoints = points.slice(0, 50);
      for (const point of maxPoints) {
        if (typeof point.lat !== "number" || typeof point.lng !== "number") continue;
        const p = projectToSphere(point.lat, point.lng + frame * 200, radius);
        if (p.z < 0) continue;
        const alpha = 0.2 + (p.z / radius) * 0.8;
        const size = 2 + (p.z / radius) * 2;
        ctx.fillStyle = `rgba(244,114,182,${alpha})`;
        ctx.beginPath();
        ctx.arc(cx + p.x, cy - p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [points]);

  return <canvas ref={canvasRef} className="w-full h-[320px] rounded-2xl bg-slate-900" />;
}

