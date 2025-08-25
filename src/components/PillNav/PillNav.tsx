import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  items: PillNavItem[];
  className?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  className = "",
  baseColor = "rgba(30, 4, 54, 0.18)",
  pillColor = "transparent",
  hoveredPillTextColor = "#9d91c9ff",
  pillTextColor,
}) => {
  const resolvedPillTextColor = pillTextColor ?? "#fff";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  useEffect(() => {
    circleRefs.current.forEach((circle, i) => {
      if (!circle?.parentElement) return;
      const pill = circle.parentElement as HTMLElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      gsap.set(circle, { width: D, height: D, bottom: -delta, xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

      const label = pill.querySelector<HTMLElement>(".pill-label");
      const white = pill.querySelector<HTMLElement>(".pill-label-hover");

      if (label) gsap.set(label, { y: 0 });
      if (white) gsap.set(white, { y: h + 12, opacity: 0 });

      tlRefs.current[i]?.kill();
      const tl = gsap.timeline({ paused: true });
      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.3, ease: "power3.out" }, 0);
      if (label) tl.to(label, { y: -(h + 8), duration: 0.3, ease: "power3.out" }, 0);
      if (white) tl.to(white, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, 0);
      tlRefs.current[i] = tl;
    });
  }, [items]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: "power3.out" });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease: "power3.out" });
  };

  return (
    <div className={`sticky top-0 z-[1000] w-full ${className}`} style={{ background: baseColor }}>
      <nav className="flex items-center justify-between px-4 md:px-8 py-2">
        {/* Portofolio kiri */}
        <div className="font-bold text-white uppercase tracking-wider text-[18px]">
          Portofolio
        </div>

        {/* Menu kanan */}
        <ul className="flex items-center gap-2 m-0 p-0 list-none md:flex hidden">
          {items.map((item, i) => {
            const isRouter = isRouterLink(item.href);
            const pillStyle: React.CSSProperties = {
              background: pillColor,
              color: resolvedPillTextColor,
              padding: "0 16px",
              position: "relative",
              height: "48px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "16px",
              textTransform: "uppercase",
              cursor: "pointer",
              overflow: "hidden",
            };

            const PillContent = (
              <>
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  ref={(el) => (circleRefs.current[i] = el)}
                  style={{ background: baseColor, willChange: "transform" }}
                />
                <span className="pill-label relative z-10">{item.label}</span>
                <span
                  className="pill-label-hover absolute left-0 top-0 z-20 inline-block"
                  style={{ color: hoveredPillTextColor }}
                  aria-hidden="true"
                >
                  {item.label}
                </span>
              </>
            );

            return (
              <li key={item.href} className="relative">
                {isRouter ? (
                  <Link
                    to={item.href}
                    style={pillStyle}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {PillContent}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    style={pillStyle}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {PillContent}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Hamburger mobile kanan */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-1 p-2"
          onClick={toggleMobileMenu}
        >
          <span className="w-5 h-[2px] bg-white rounded"></span>
          <span className="w-5 h-[2px] bg-white rounded"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-2 p-4 bg-white/10">
          {items.map((item) =>
            isRouterLink(item.href) ? (
              <Link
                key={item.href}
                to={item.href}
                className="block py-2 px-4 rounded text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 px-4 rounded text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PillNav;
