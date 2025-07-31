"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
export default function Section2() {
  const section = useRef(null);
  const text = useRef(null);
  useGSAP(async () => {
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });

    const headlineSplit = SplitText.create(text.current, {
      type: "words",
      wordsClass: "word++",
      ignore: "sup",
    });

    gsap.from(headlineSplit.words, {
      y: -100,
      opacity: 0,
      rotation: "random(-80, 80)",
      stagger: 0.1,
      duration: 1,
      ease: "back",
      background: "transparent",
      scrollTrigger: {
        trigger: section.current,
        start: "top 20%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.from(section.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: section.current,
        start: "top 20%",
        toggleActions: "play reverse play reverse",
      },
    });
  });

  return (
    <div
      ref={section}
      className="w-full h-[150%] relative flex flex-row items-start gap-5 md:flex-row p-20 bg-gradient-to-t from-teal-400 to-yellow-200"
    >
      <div
        ref={text}
        className="text-5xl lg:text-8xl font-bold text-black flex flex-col w-[50%] gap-5 uppercase tracking-wider z-1"
      >
        <div>Your dream job</div>
        <div>starts</div>
        <div> with your preparation today</div>
      </div>
      <img
        className="w-full h-full p-0 object-cover absolute top-0 left-0 opacity-[50%]"
        src="section2.1.jpg"
      />
    </div>
  );
}
