"use client";

import { ReactNode, useEffect, useRef } from "react";

export function Pendulum({ children }: { children?: ReactNode }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const stringRef = useRef<SVGLineElement | null>(null);
  const bobRef = useRef<SVGCircleElement | null>(null);
  const angleRef = useRef<SVGTextElement | null>(null);
  const periodRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const stringEl = stringRef.current;
    const bob = bobRef.current;
    const angleT = angleRef.current;
    const periodT = periodRef.current;
    if (!svg || !stringEl || !bob || !angleT || !periodT) return;

    const pivot = { x: 260, y: 30 };
    const L = 140;
    const g = 9.81;
    const ell = 1.5;

    let theta = 0.35;
    let omega = 0;
    let dragging = false;
    let rafId = 0;

    const draw = () => {
      const bx = pivot.x + L * Math.sin(theta);
      const by = pivot.y + L * Math.cos(theta);
      stringEl.setAttribute("x2", bx.toFixed(1));
      stringEl.setAttribute("y2", by.toFixed(1));
      bob.setAttribute("cx", bx.toFixed(1));
      bob.setAttribute("cy", by.toFixed(1));
      angleT.textContent = "θ = " + theta.toFixed(2);
      const T = 2 * Math.PI * Math.sqrt(ell / g) * (1 + (theta * theta) / 16);
      periodT.textContent = "T ≈ " + T.toFixed(2) + " s";
    };

    const step = () => {
      if (!dragging) {
        const dt = 0.016;
        const a = -(g / ell) * Math.sin(theta);
        omega += a * dt;
        omega *= 0.997;
        theta += omega * dt;
        draw();
      }
      rafId = requestAnimationFrame(step);
    };

    const pt = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      return { x: (x * 520) / r.width, y: (y * 220) / r.height };
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      svg.setPointerCapture(e.pointerId);
      const p = pt(e);
      theta = Math.atan2(p.x - pivot.x, p.y - pivot.y);
      omega = 0;
      draw();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const p = pt(e);
      theta = Math.atan2(p.x - pivot.x, p.y - pivot.y);
      omega = 0;
      draw();
    };
    const onUp = () => {
      dragging = false;
    };

    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerup", onUp);
    svg.addEventListener("pointercancel", onUp);

    draw();
    step();

    return () => {
      cancelAnimationFrame(rafId);
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerup", onUp);
      svg.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="fig">
      <svg
        ref={svgRef}
        width="520"
        height="220"
        viewBox="0 0 520 220"
        aria-label="Interactive pendulum"
      >
        <g stroke="#4a4235" strokeWidth="0.75" fill="none">
          <line x1="40" y1="30" x2="480" y2="30" />
          <line x1="260" y1="24" x2="260" y2="36" />
          <text
            x="260"
            y="18"
            textAnchor="middle"
            fontFamily="var(--font-stix), STIX Two Text"
            fontStyle="italic"
            fontSize="12"
            fill="#6e6554"
          >
            pivot
          </text>
        </g>
        <line
          ref={stringRef}
          x1="260"
          y1="30"
          x2="260"
          y2="170"
          stroke="#1f1a14"
          strokeWidth="1.2"
        />
        <circle ref={bobRef} cx="260" cy="170" r="9" fill="#1f1a14" />
        <circle cx="260" cy="170" r="3" fill="#a3321f" />
        <g
          fontFamily="var(--font-stix), STIX Two Text"
          fontSize="13"
          fill="#6e6554"
          fontStyle="italic"
          textAnchor="end"
        >
          <text ref={angleRef} x="510" y="115">
            θ = 0.00
          </text>
          <text ref={periodRef} x="510" y="135">
            T ≈ 2.4 s
          </text>
        </g>
        <path
          d="M 40 200 Q 260 200 480 200"
          stroke="#d7cdb6"
          fill="none"
        />
        <text
          x="40"
          y="215"
          fontFamily="var(--font-inter-tight), Inter Tight"
          fontSize="10"
          fill="#9a9077"
          letterSpacing="0.08em"
        >
          DRAG THE BOB
        </text>
      </svg>
      {children ? <div className="caption">{children}</div> : null}
    </div>
  );
}
