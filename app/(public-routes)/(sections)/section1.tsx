"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import animations from "@/components/resuable/animations";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const pAnimation = async (ref: any, interval: number = 100) => {
  return new Promise((res) => {
    setTimeout(() => {
      gsap.set(ref.current, { opacity: 1 });
      let split;
      SplitText.create(ref.current, {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          split = gsap.from(self.lines, {
            duration: 0.6,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
          });
          return split;
        },
      });
      res(null);
    }, interval);
  });
};

export default function Section1() {
  const section = useRef(null);
  const title = useRef(null);
  const des1 = useRef(null);
  const des2 = useRef(null);
  const des3 = useRef(null);
  const { theme, setTheme } = useTheme();

  useGSAP(async () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });

    let i = 0;
    for (let ref of [des1, des2, des3]) {
      await pAnimation(ref, (i + 1) * 100);
      i++;
    }
    gsap.set(title.current, { opacity: 1 });
    gsap.from(title.current, {
      duration: 1, // Animation duration in seconds
      x: -100, // Start 100 pixels to the left
      opacity: 0, // Start with opacity 0 (invisible)
      ease: "power2.out", // Choose an easing function for a smoother animation
    });
  });

  const handleCreate = () => {
    const html = document.documentElement;
    html.classList.remove("dark");
    html.classList.add(theme || "dark");

    redirect("/interviews/create");
  };

  useEffect(() => {
    const html = document.documentElement;
    setTimeout(() => {
      html.classList.add("light");
      html.classList.remove("dark");
    }, 100);
  }, []);

  return (
    <div
      ref={section}
      className="container-2 w-full h-full relative flex flex-col justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center gap-5 md:flex-row">
        <div
          className="font-bold text-5xl text-black mb-2 z-1 tracking-[5px] opacity-0 lg:text-8xl text-center md:text-right w-full"
          ref={title}
        >
          INTERVIEW.AI
        </div>
        <div className="flex flex-col w-full justify-center items-center md:items-start">
          <div
            className="font-[400] text-2xl text-black z-1 opacity-0 tracking-[3px] md:text-xl"
            ref={des1}
          >
            Practice realistic interviews
          </div>
          <div
            className="font-[400] text-2xl text-black z-1 opacity-0 tracking-[3px] md:text-xl"
            ref={des2}
          >
            Get actionable feedbacks
          </div>
          <div
            className="font-[400] text-2xl text-black z-1 opacity-0 tracking-[3px] md:text-xl"
            ref={des3}
          >
            Improve your performance
          </div>
        </div>
      </div>
      <animations.ScaleBounce
        options={{ delay: 1 }}
        className="opacity-[100%] z-1"
      >
        <Button
          className="cursor-pointer mt-5 text-xl rounded-2xl px-10"
          onClick={handleCreate}
        >
          Create an Interview
        </Button>
      </animations.ScaleBounce>
      <video
        autoPlay
        muted
        loop
        className="w-full h-full p-0 object-cover opacity-60 absolute top-0 left-0"
      >
        <source src="background1.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
