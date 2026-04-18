import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ProjectRatingProps {
  projectId: number | string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function ProjectRating({ projectId, size = "md" }: ProjectRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem(`project-rating-${projectId}`);
    if (stored) {
      setRating(parseInt(stored, 10));
    }
  }, [projectId]);

  useEffect(() => {
    localStorage.setItem(`project-rating-${projectId}`, rating.toString());
  }, [rating, projectId]);

  const starSizeClass = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label={`Project rating: ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={`${starSizeClass} p-0.5 rounded hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50`}
          >
            <Star
              fill={isFilled ? "currentColor" : "none"}
              className={`${starSizeClass} ${isFilled ? "text-terracotta" : "text-stone-gray/40"}`}
            />
          </button>
        );
      })}
    </div>
  );
}
