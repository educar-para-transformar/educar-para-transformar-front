import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = "",
}) => {
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 40 };
      case 'down': return { y: -40 };
      case 'left': return { x: 40 };
      case 'right': return { x: -40 };
      default: return {};
    }
  };

  const initialOffset = getDirectionOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialOffset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Smooth custom ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
