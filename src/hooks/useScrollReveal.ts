"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
};

export function useScrollReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const children = el.querySelectorAll("[data-reveal]");
    const targets = children.length > 0 ? children : [el];

    gsap.set(targets, { y: options.y ?? 60, opacity: options.opacity ?? 0 });

    const tween = gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: options.duration ?? 1,
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0.15,
      ease: options.ease ?? "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [options.y, options.opacity, options.duration, options.delay, options.stagger, options.ease]);

  return ref;
}
