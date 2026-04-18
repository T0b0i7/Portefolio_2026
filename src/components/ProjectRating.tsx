import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectRatingProps {
  projectId: string | number;
  initialLikes?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ProjectRating({ 
  projectId, 
  initialLikes = 0, 
  className,
  size = "md" 
}: ProjectRatingProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const storageKey = `project_like_${projectId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "true") {
      setIsLiked(true);
    }
    
    // Simulate getting total likes from a server or random offset for demo
    // In a real app, this would come from a database
    const totalLikesKey = `project_total_likes_${projectId}`;
    const savedTotal = localStorage.getItem(totalLikesKey);
    if (savedTotal) {
      setLikes(parseInt(savedTotal, 10));
    } else {
      // Demo: Assign a random initial like count if not set
      const demoLikes = Math.floor(Math.random() * 50) + 10;
      setLikes(demoLikes);
      localStorage.setItem(totalLikesKey, demoLikes.toString());
    }
  }, [projectId, storageKey]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    const newTotal = newLikedState ? likes + 1 : likes - 1;
    setLikes(newTotal);
    
    localStorage.setItem(storageKey, newLikedState.toString());
    localStorage.setItem(`project_total_likes_${projectId}`, newTotal.toString());
  };

  const iconSize = size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-6 h-6";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleLike}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all border",
          isLiked 
            ? "bg-terracotta/10 border-terracotta/20 text-terracotta shadow-glow" 
            : "bg-white/5 border-white/10 text-stone-gray hover:border-white/20"
        )}
      >
        <Star 
          className={cn(iconSize, isLiked && "fill-terracotta")} 
        />
        <AnimatePresence mode="wait">
          <motion.span 
            key={likes}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs font-sans font-bold"
          >
            {likes}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
