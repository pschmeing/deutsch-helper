import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  variant?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale" | "blur";
}

const ScrollReveal = ({ children, className = "" }: ScrollRevealProps) => {
  return <div className={className}>{children}</div>;
};

export default ScrollReveal;
