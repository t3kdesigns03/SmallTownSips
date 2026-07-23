"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  IOWA_VIEWBOX,
  IOWA_PATH,
  TILES,
  TRURO,
} from "@/lib/iowa-mosaic";
import styles from "./InteractiveLogo.module.css";

/**
 * The living brand mark: the state of Iowa rendered as a bright mosaic of
 * hand-placed tiles that pop in on scroll, twinkle at rest, and ripple with a
 * color-shift wave on hover. Truro gets a pulsing gold heart. A loaded-tea cup
 * bobs alongside with a swaying leaf. Pure CSS/SVG — no runtime animation libs.
 */
export function InteractiveLogo({
  className,
  cupScale = 1,
}: {
  className?: string;
  cupScale?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={cn(styles.wrap, className)}>
      <svg
        ref={ref}
        viewBox={IOWA_VIEWBOX}
        className={cn(styles.svg, revealed && styles.revealed)}
        role="img"
        aria-label="Small Town Sips — the state of Iowa as a colorful mosaic with a loaded tea cup, marking Truro"
      >
        <defs>
          <clipPath id="iowaClip">
            <path d={IOWA_PATH} />
          </clipPath>
          <linearGradient id="drink" x1="0.1" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#FFF06B" />
            <stop offset="30%" stopColor="#FFC13C" />
            <stop offset="58%" stopColor="#FF6FA0" />
            <stop offset="100%" stopColor="#E5327E" />
          </linearGradient>
          <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7E4F5" />
            <stop offset="100%" stopColor="#63BCDB" />
          </linearGradient>
          <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="45%" r="58%">
            <stop offset="0%" stopColor="#FFD86B" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#FF7FB4" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#FF7FB4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Mosaic tiles, clipped to the Iowa outline */}
        <g clipPath="url(#iowaClip)">
          <rect x="0" y="0" width="1000" height="640" fill="#FBF3E4" />
          {TILES.map((t) => (
            <rect
              key={t.i}
              className={styles.tile}
              x={t.x}
              y={t.y}
              width={t.w}
              height={t.h}
              rx={5}
              fill={t.c}
              style={{ ["--w" as string]: t.wave }}
            />
          ))}
        </g>

        {/* Crisp state outline over the mosaic */}
        <path d={IOWA_PATH} className={styles.outline} />

        {/* Script wordmark, top-left, on a soft cream panel */}
        <g className={styles.wordmark}>
          <rect
            x="26"
            y="44"
            width="446"
            height="122"
            rx="26"
            fill="#FBF3E4"
            opacity="0.86"
            stroke="#E7D8BC"
            strokeWidth="2"
          />
          <text
            x="249"
            y="118"
            textAnchor="middle"
            fontFamily="var(--font-script)"
            fontWeight="700"
            fontSize="76"
            fill="#A9502F"
          >
            small town sips
          </text>
          <path
            d="M96 140 Q249 158 402 140"
            fill="none"
            stroke="var(--gold, #e0a84e)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        {/* Truro location marker — an interactive mini loaded tea in Madison County */}
        <g transform={`translate(${TRURO.x}, ${TRURO.y})`}>
          <g className={styles.marker}>
            <title>Truro, Iowa</title>
            {/* pulse + dot at the exact location */}
            <circle className={styles.markerRing} cx="0" cy="0" r="6" />
            <circle cx="0" cy="0" r="3.6" fill="#A9502F" />
            <g className={styles.markerInner}>
            <g transform="translate(0,-10)">
              {/* cup body */}
              <path
                d="M-17,-40 L17,-40 L13,-2 A5,5 0 0 1 8,2 L-8,2 A5,5 0 0 1 -13,-2 Z"
                fill="url(#drink)"
                stroke="#8A2E3E"
                strokeWidth="2.4"
              />
              {/* fruit */}
              <circle cx="-4.5" cy="-6" r="3.2" fill="#C8286A" />
              <circle cx="4.5" cy="-4" r="3" fill="#FF4D8F" />
              <circle cx="0" cy="-9" r="2.3" fill="#FFD54A" />
              {/* gloss + bubble */}
              <path d="M-14,-40 Q-11,-41 -8,-39 L-11,-4 A3,3 0 0 1 -14,-6 Z" fill="url(#gloss)" />
              <circle cx="6" cy="-16" r="1.8" fill="#FFFFFF" opacity="0.6" />
              {/* leaf badge */}
              <circle cx="0" cy="-22" r="8.5" fill="#FBF3E4" stroke="#8A2E3E" strokeWidth="1.6" />
              <path d="M0,-16 C-5,-19 -6,-25 -1,-29 C0,-24 3,-19 0,-16 Z" fill="#5F9E33" />
              <path d="M0,-16 C5,-19 6,-25 1,-29 C0,-24 -3,-19 0,-16 Z" fill="#7BC043" />
              {/* rim + lid */}
              <rect x="-19" y="-44" width="38" height="6" rx="3" fill="#F3E6CE" stroke="#8A2E3E" strokeWidth="1.6" />
              <path
                d="M-15,-44 L15,-44 L12,-52 A4,4 0 0 0 8,-55 L-8,-55 A4,4 0 0 0 -12,-52 Z"
                fill="url(#lid)"
                stroke="#3E7E96"
                strokeWidth="1.6"
              />
              {/* orange slice */}
              <circle cx="12" cy="-55" r="6" fill="#FFB13C" stroke="#E07A1F" strokeWidth="1.6" />
              <circle cx="12" cy="-55" r="3" fill="#FFD07A" />
              {/* straw */}
              <rect
                className={styles.markerStraw}
                x="-2"
                y="-72"
                width="5"
                height="32"
                rx="2.5"
                fill="#FF6FA5"
                stroke="#C83C74"
                strokeWidth="1.3"
                transform="rotate(12 0.5 -40)"
              />
            </g>
          </g>
            {/* label */}
            <text
              className={styles.markerLabel}
              x="26"
              y="-36"
              fontFamily="var(--font-sans)"
              fontWeight="700"
              fontSize="26"
              paintOrder="stroke"
              stroke="#FBF3E4"
              strokeWidth="6"
              strokeLinejoin="round"
              fill="#3A322C"
            >
              Truro, IA
            </text>
          </g>
        </g>

        {/* Loaded tea cup */}
        <g transform={`translate(632, 74) scale(${cupScale})`}>
          <g className={styles.cup}>
            {/* soft glow halo behind the cup */}
            <ellipse cx="100" cy="185" rx="150" ry="168" fill="url(#glow)" />
            {/* leaf sprig to the left of the cup */}
            <g className={styles.leaf} transform="translate(-42, 120)">
              <path
                d="M0,60 C4,34 22,14 48,6 C40,30 24,52 0,60 Z"
                fill="#7BC043"
                stroke="#4E7A28"
                strokeWidth="2"
              />
              <path d="M6,54 L42,14" stroke="#4E7A28" strokeWidth="2" fill="none" />
            </g>

            {/* cup body */}
            <path
              d="M18,70 L182,70 L162,300 A22,22 0 0 1 140,320 L60,320 A22,22 0 0 1 38,300 Z"
              fill="url(#drink)"
              stroke="#8A2E3E"
              strokeWidth="3"
            />
            {/* fruit / boba at the bottom */}
            <circle cx="72" cy="290" r="10" fill="#FF4D8F" />
            <circle cx="100" cy="298" r="11" fill="#C8286A" />
            <circle cx="128" cy="288" r="9" fill="#FF6FA8" />
            <circle cx="90" cy="272" r="7" fill="#FFD54A" />
            <circle cx="112" cy="278" r="6" fill="#FF8A3D" />
            {/* effervescent bubbles */}
            <g fill="#FFFFFF">
              <circle cx="56" cy="252" r="4.5" opacity="0.6" />
              <circle cx="70" cy="214" r="3" opacity="0.5" />
              <circle cx="152" cy="238" r="5" opacity="0.5" />
              <circle cx="140" cy="205" r="3.5" opacity="0.45" />
              <circle cx="122" cy="256" r="2.6" opacity="0.55" />
              <circle cx="60" cy="150" r="3" opacity="0.45" />
            </g>
            {/* glossy glass highlight down the left edge */}
            <path
              d="M34,74 Q40,72 50,76 L44,300 A6,6 0 0 1 34,298 Z"
              fill="url(#gloss)"
            />
            {/* leaf emblem badge on the cup */}
            <circle cx="100" cy="185" r="34" fill="#FBF3E4" stroke="#8A2E3E" strokeWidth="2.5" />
            <path
              d="M100,205 C86,197 82,182 90,168 C104,172 110,190 100,205 Z"
              fill="#5F9E33"
            />
            <path
              d="M100,205 C114,197 118,182 110,168 C96,172 90,190 100,205 Z"
              fill="#7BC043"
            />
            {/* rim + lid */}
            <rect x="10" y="54" width="180" height="20" rx="9" fill="#F3E6CE" stroke="#8A2E3E" strokeWidth="2.5" />
            <path d="M22,54 L178,54 L172,30 A14,14 0 0 0 158,20 L42,20 A14,14 0 0 0 28,30 Z" fill="url(#lid)" stroke="#3E7E96" strokeWidth="2.5" />
            {/* orange slice garnish */}
            <circle cx="150" cy="20" r="18" fill="#FFB13C" stroke="#E07A1F" strokeWidth="2.5" />
            <circle cx="150" cy="20" r="10" fill="#FFD07A" />
            {/* straw */}
            <g className={styles.straw} transform="translate(120,0)">
              <rect x="0" y="-46" width="12" height="90" rx="6" fill="#FF6FA5" stroke="#C83C74" strokeWidth="2" transform="rotate(14 6 0)" />
              <rect x="0" y="-46" width="12" height="90" rx="6" fill="url(#stripe)" transform="rotate(14 6 0)" />
            </g>
            {/* sparkles */}
            <g fill="#FFFFFF">
              <path className={styles.sparkle} d="M60,116 l4.5,11 11,4.5 -11,4.5 -4.5,11 -4.5,-11 -11,-4.5 11,-4.5 Z" opacity="0.92" />
              <path className={styles.sparkle} style={{ animationDelay: "1.1s" }} d="M172,150 l3,7.5 7.5,3 -7.5,3 -3,7.5 -3,-7.5 -7.5,-3 7.5,-3 Z" opacity="0.8" />
              <path className={styles.sparkle} style={{ animationDelay: "0.6s" }} d="M150,250 l2.4,6 6,2.4 -6,2.4 -2.4,6 -2.4,-6 -6,-2.4 6,-2.4 Z" opacity="0.75" />
            </g>
          </g>
        </g>

        {/* candy-stripe pattern for the straw */}
        <defs>
          <pattern id="stripe" width="12" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <rect width="12" height="16" fill="transparent" />
            <rect width="12" height="8" fill="rgba(255,255,255,0.7)" />
          </pattern>
        </defs>
      </svg>
    </div>
  );
}
