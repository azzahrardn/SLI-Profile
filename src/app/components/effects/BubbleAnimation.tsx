import { useMemo } from "react";
import "./bubble-animations.css";

interface BubbleAnimationProps {
  variant: "white" | "light-blue" | "dark" | "hero";
  density?: "low" | "medium" | "high";
  enabled?: boolean;
}

export function BubbleAnimation({
  variant,
  density = "medium",
  enabled = true,
}: BubbleAnimationProps) {
  const bubbles = useMemo(() => {
    if (!enabled) return [];

    // Determine bubble count based on density
    const getBubbleCount = () => {
      switch (density) {
        case "low":
          return 6;
        case "medium":
          return 10;
        case "high":
          return 15;
        default:
          return 10;
      }
    };

    const count = getBubbleCount();

    // Color schemes based on variant
    const getColorClasses = (index: number) => {
      const colorIndex = index % 3;

      switch (variant) {
        case "white":
          return [
            "bg-[#0891b2]/[0.04] backdrop-blur-sm",
            "bg-[#38bdf8]/[0.03] backdrop-blur-sm",
            "bg-[#0c4a6e]/[0.02] backdrop-blur-sm",
          ][colorIndex];

        case "light-blue":
          return [
            "bg-[#0891b2]/[0.05] backdrop-blur-md",
            "bg-[#7dd3fc]/[0.04] backdrop-blur-md",
            "bg-[#0c4a6e]/[0.03] backdrop-blur-md",
          ][colorIndex];

        case "dark":
          return [
            "bg-[#7dd3fc]/[0.06] backdrop-blur-md",
            "bg-[#38bdf8]/[0.05] backdrop-blur-md",
            "bg-[#bae6fd]/[0.04] backdrop-blur-md",
          ][colorIndex];

        case "hero":
          return [
            "bg-[#7dd3fc]/[0.08] backdrop-blur-md mix-blend-overlay",
            "bg-[#38bdf8]/[0.06] backdrop-blur-md mix-blend-soft-light",
            "bg-[#bae6fd]/[0.05] backdrop-blur-sm mix-blend-overlay",
          ][colorIndex];

        default:
          return "bg-[#0891b2]/[0.04] backdrop-blur-sm";
      }
    };

    // Generate bubble properties
    return Array.from({ length: count }, (_, i) => {
      const size = Math.floor(Math.random() * 340) + 60; // 60-400px
      const left = Math.floor(Math.random() * 100); // 0-100%
      const delay = Math.floor(Math.random() * 15); // 0-15s
      const duration = Math.floor(Math.random() * 10) + 15; // 15-25s
      const animationType = Math.random() > 0.5 ? "bubble-float" : "bubble-rise";

      return {
        id: i,
        size,
        left,
        delay,
        duration,
        animation: animationType,
        colorClass: getColorClasses(i),
      };
    });
  }, [variant, density, enabled]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`bubble ${bubble.colorClass}`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: `-${bubble.size / 2}px`,
            animation: `${bubble.animation} ${bubble.duration}s ease-in-out ${-bubble.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
