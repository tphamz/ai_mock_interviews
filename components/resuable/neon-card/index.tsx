"use client";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import React from "react";
import animations from "../animations";

type NeonCardProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};
export default function NeonCard({ children, ...rest }: NeonCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const onMouseEnter = () => {
    ref.current?.classList.add("neon-card");
    gsap.to(ref.current, {
      rotate: -1,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const onMouseLeave = () => {
    ref.current?.classList.remove("neon-card");
    gsap.to(ref.current, {
      rotate: 0,
      duration: 0.3,
      ease: "power1.out",
    });
  };
  return (
    <animations.Stagger options={{ duration: 0.5, delay: 1 }} {...rest}>
      <Card ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </Card>
    </animations.Stagger>
  );
}
