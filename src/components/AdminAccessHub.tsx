import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, Settings, Database, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminAccessHub() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + SHIFT + M (Management)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'm') {
        navigate("/dashboard");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return null;
}


