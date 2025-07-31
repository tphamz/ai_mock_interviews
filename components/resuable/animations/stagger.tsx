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
export function Stagger({ children, options = {}, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(async () => {
    if (ref && "current" in ref && ref.current) {
      gsap.from(ref.current, {
        y: 20,
        opacity: 0,
        duration: options.duration || 0.5,
        stagger: 0.2,
        ease: options.ease || "power1.out",
        delay: options.delay || 1,
      });
    }
  });
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
