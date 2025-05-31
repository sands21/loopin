"use client";

import { MotionConfig } from "framer-motion";

interface MotionProviderProps {
  children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      {children}
    </MotionConfig>
  );
} 