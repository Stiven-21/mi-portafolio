"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollAnimatorProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  amount?: number;
}

const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 50,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: amount, opacity: 0 };
      case "down":
        return { y: -amount, opacity: 0 };
      case "left":
        return { x: amount, opacity: 0 };
      case "right":
        return { x: -amount, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      default:
        return { opacity: 1 };
    }
  };

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className || ""}`}
    >
      <motion.div
        initial={getInitialPosition()}
        animate={isInView ? getAnimatePosition() : getInitialPosition()}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollAnimator;
