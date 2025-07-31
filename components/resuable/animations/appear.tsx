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
export function Appear({ children, options = {}, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (ref && "current" in ref && ref.current) {
      gsap.from(ref.current, {
        opacity: 0,
        ease: options.ease || "back.out(1.7)",
        duration: options.duration || 1,
        delay: options.delay || 0.5,
      });
    }
  });

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
