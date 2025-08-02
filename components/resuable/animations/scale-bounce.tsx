"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type Props = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  options?: {
    duration?: number;
    ease?: string;
    delay?: number;
  };
};
export function ScaleBounce({ children, options = {}, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (ref && "current" in ref && ref.current) {
      gsap.from(ref.current, {
        scale: 0.5,
        opacity: 0,
        duration: options.duration || 0.8,
        ease: options.ease || "back.out(1.7)",
        delay: options.delay || 0,
      });
    }
  });
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
