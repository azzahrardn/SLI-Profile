import { ReactNode } from "react";
import { BubbleAnimation } from "./BubbleAnimation";

interface BubbleBackgroundProps {
  children: ReactNode;
  variant: "white" | "light-blue" | "dark" | "hero";
  density?: "low" | "medium" | "high";
  enabled?: boolean;
}

/**
 * BubbleBackground - Wrapper component for adding subtle bubble animation backgrounds
 *
 * @param children - Section content to wrap
 * @param variant - Background color variant for bubble color scheme
 * @param density - Bubble density: 'low' (6 bubbles), 'medium' (10 bubbles), 'high' (15 bubbles)
 * @param enabled - Toggle animation on/off
 *
 * @example
 * <BubbleBackground variant="white" density="medium">
 *   <section className="py-20 bg-white relative overflow-hidden">
 *     {/* content *\/}
 *   </section>
 * </BubbleBackground>
 */
export function BubbleBackground({
  children,
  variant,
  density = "medium",
  enabled = true,
}: BubbleBackgroundProps) {
  return (
    <div className="relative">
      <BubbleAnimation variant={variant} density={density} enabled={enabled} />
      {children}
    </div>
  );
}
