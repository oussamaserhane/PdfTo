'use client';

import { forwardRef, useCallback, useImperativeHandle } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion, useAnimationControls } from 'motion/react';
import type { AnimatedIconHandle, AnimatedIconProps } from './types';

export function createHoverIcon(BaseIcon: LucideIcon, displayName: string) {
  const HoverIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
      {
        size = 24,
        color = 'currentColor',
        strokeWidth = 2,
        className = '',
        ...props
      },
      ref
    ) => {
      const controls = useAnimationControls();

      const startAnimation = useCallback(() => {
        controls.start({
          scale: [1, 1.12, 1],
          rotate: [0, -4, 4, 0],
          transition: { duration: 0.45, ease: 'easeOut' },
        });
      }, [controls]);

      const stopAnimation = useCallback(() => {
        controls.start({
          scale: 1,
          rotate: 0,
          transition: { duration: 0.18, ease: 'easeOut' },
        });
      }, [controls]);

      useImperativeHandle(ref, () => ({
        startAnimation,
        stopAnimation,
      }));

      return (
        <motion.span
          animate={controls}
          onHoverStart={startAnimation}
          onHoverEnd={stopAnimation}
          className={`inline-flex items-center justify-center ${className}`}
          style={{
            width: size,
            height: size,
            color,
          }}
        >
          <BaseIcon
            width={size}
            height={size}
            strokeWidth={strokeWidth}
            color="currentColor"
            aria-hidden="true"
            {...props}
          />
        </motion.span>
      );
    }
  );

  HoverIcon.displayName = displayName;
  return HoverIcon;
}