"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

const FADE_OUT_MS = 220;

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setExiting(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    if (reduceMotion) return;

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      if (
        anchor.target &&
        anchor.target !== "_self"
      ) {
        return;
      }
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(rawHref, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      // Same pathname with only a hash change -> let the browser scroll smoothly
      if (url.pathname === window.location.pathname && url.hash) {
        return;
      }

      // Already on the exact same URL -> no-op
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        !url.hash
      ) {
        return;
      }

      event.preventDefault();
      const destination = `${url.pathname}${url.search}${url.hash}`;

      // Prefetch destination immediately while fading out
      router.prefetch(destination);
      setExiting(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        router.push(destination);
      }, FADE_OUT_MS);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reduceMotion, router]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={
        exiting
          ? { opacity: 0, y: -6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }
          : { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } }
      }
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
