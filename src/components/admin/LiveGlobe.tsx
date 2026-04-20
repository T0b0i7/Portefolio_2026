import { useEffect, useRef, useState, useCallback } from "react";

type GlobePoint = {
  id: string;
  lat: number;
  lng: number;
  country: string | null;
  city: string | null;
};

type Props = {
  points: GlobePoint[];
  onPointClick?: (pointId: string) => void;
  selectedPointId?: string | null;
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

export function LiveGlobe({ points, onPointClick, selectedPointId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<GlobePoint | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!hoveredPoint || !onPointClick) return;
      onPointClick(hoveredPoint.id);
    },
    [hoveredPoint, onPointClick]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredPoint(null);
    setMousePos(null);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      frame += 0.003;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius * 1.3
      );
      grad.addColorStop(0, "rgba(15,23,42,0.95)");
      grad.addColorStop(0.5, "rgba(30,41,59,0.9)");
      grad.addColorStop(1, "rgba(15,23,42,0.98)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(148,163,184,0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 6; i++) {
        const r = radius * (i / 6);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = -180; i <= 180; i += 30) {
        const r = radius * Math.cos((i * Math.PI) / 180);
        const y = radius * Math.sin((i * Math.PI) / 180);
        if (Math.abs(y) < radius * 0.99) {
          ctx.beginPath();
          ctx.moveTo(cx - radius, cy + y);
          ctx.lineTo(cx + radius, cy + y);
          ctx.strokeStyle = "rgba(148,163,184,0.08)";
          ctx.stroke();
        }
      }

      const validPoints = points.filter(
        (p) => typeof p.lat === "number" && typeof p.lng === "number"
      );

      for (const point of validPoints) {
        const p = projectToSphere(point.lat, point.lng + frame * 80, radius);
        if (p.z < 0) continue;

        const isSelected = point.id === selectedPointId;
        const alpha = 0.3 + (p.z / radius) * 0.7;
        const size = isSelected ? 6 : 3 + (p.z / radius) * 3;

        ctx.beginPath();
        ctx.arc(cx + p.x, cy - p.y, size, 0, Math.PI * 2);

        if (isSelected) {
          ctx.fillStyle = `rgba(244,63,94,${alpha + 0.4})`;
          ctx.shadowColor = "rgba(244,63,94,0.8)";
          ctx.shadowBlur = 15;
        } else {
          ctx.fillStyle = `rgba(168,85,247,${alpha})`;
          ctx.shadowColor = "rgba(168,85,247,0.6)";
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      const activeNow = validPoints;

      for (const point of activeNow) {
        const p = projectToSphere(point.lat, point.lng + frame * 80, radius);
        if (p.z < 0) continue;

        const pulse = (Math.sin(frame * 5) + 1) / 2;
        ctx.beginPath();
        ctx.arc(cx + p.x, cy - p.y, 8 + pulse * 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168,85,247,${0.15 + pulse * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [points, selectedPointId]);

  useEffect(() => {
    if (!mousePos || !canvasRef.current) {
      setHoveredPoint(null);
      return;
    }

    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.38;

    let found: GlobePoint | null = null;

    for (const point of points) {
      const p = projectToSphere(point.lat, point.lng, radius);
      const screenX = cx + p.x;
      const screenY = cy - p.y;
      const dist = Math.sqrt(
        (screenX - mousePos.x) ** 2 + (screenY - mousePos.y) ** 2
      );
      if (dist < 15 && p.z > 0) {
        found = point;
        break;
      }
    }

    setHoveredPoint(found);
  }, [points, mousePos]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-[350px] rounded-2xl bg-slate-900 cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      />
      {hoveredPoint && (
        <div
          className="absolute bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-slate-700 pointer-events-none z-10"
          style={{
            left: mousePos ? mousePos.x + 10 : 0,
            top: mousePos ? mousePos.y - 40 : 0,
          }}
        >
          <div className="font-semibold">
            {hoveredPoint.city || hoveredPoint.country || "Inconnu"}
          </div>
          {hoveredPoint.country && hoveredPoint.city !== hoveredPoint.country && (
            <div className="text-slate-400">{hoveredPoint.country}</div>
          )}
          <div className="text-slate-500 mt-1">Cliquez pour voir le parcours</div>
        </div>
      )}
    </div>
  );
}