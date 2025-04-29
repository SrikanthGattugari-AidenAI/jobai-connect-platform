
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  threshold?: number;
  animation?: "fadeIn" | "slideUp" | "scale" | "popUp";
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.1,
  animation = "popUp",
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  // Fix: Use amount instead of threshold for the useInView hook
  const isInView = useInView(ref, { 
    once, 
    amount: threshold // Using amount instead of threshold
  });
  
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === "fadeIn" ? 10 : animation === "slideUp" ? 50 : 0,
      scale: animation === "scale" || animation === "popUp" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: animation === "popUp" ? [0.175, 0.885, 0.32, 1.275] : "easeOut", // Use spring-like animation for popUp
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
