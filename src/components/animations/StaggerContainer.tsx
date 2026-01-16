import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const StaggerContainer = ({
  children,
  className = "",
}: StaggerContainerProps) => {
  return <div className={className}>{children}</div>;
};

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    mass: 0.25,
  });
  const reducedProgress = useMotionValue(1);
  const progress = shouldReduceMotion ? reducedProgress : smoothProgress;
  const tiltX = 6;
  const rotateX = useTransform(progress, [0, 0.3, 0.5, 0.7, 1], [0, 0, tiltX, 0, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
