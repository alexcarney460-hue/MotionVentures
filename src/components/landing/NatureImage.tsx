"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  kenBurns?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
};

export default function NatureImage({
  src,
  alt,
  className = "",
  parallax = true,
  kenBurns = true,
  overlay = true,
  overlayOpacity = 0.4,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;
    const isMobile = window.innerWidth < 768;

    // Reveal: clip from bottom
    gsap.from(containerRef.current, {
      clipPath: "inset(100% 0 0 0)",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: isMobile ? "top 95%" : "top 80%",
      },
    });

    // Parallax: image moves slower than scroll
    if (parallax && !isMobile) {
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Ken Burns: subtle zoom
    if (kenBurns) {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.0 },
        {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === containerRef.current)
        .forEach((t) => t.kill());
    };
  }, [parallax, kenBurns]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div ref={imgRef} className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
        />
      </div>
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}
