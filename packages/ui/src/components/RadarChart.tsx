import React from "react";
import { FlavorProfile, Locale } from "@ahien/types";

export interface RadarChartProps {
  profile: FlavorProfile;
  locale?: Locale;
  size?: number;
  className?: string;
}

export function RadarChart({ profile, locale = "vi", size = 280, className = "" }: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.38;

  const labels = [
    { key: "aroma", vi: "Hương thơm", en: "Aroma", val: profile.aroma },
    { key: "acidity", vi: "Chua thanh", en: "Acidity", val: profile.acidity },
    { key: "sweetness", vi: "Ngọt hậu", en: "Sweetness", val: profile.sweetness },
    { key: "body", vi: "Thể chất", en: "Body", val: profile.body },
    { key: "bitterness", vi: "Đậm đắng", en: "Bitterness", val: profile.bitterness },
  ];

  const totalAxes = labels.length;
  const angleStep = (Math.PI * 2) / totalAxes;
  const startAngle = -Math.PI / 2; // Start from top

  // Calculate coordinates
  const getPoint = (index: number, valueRatio: number) => {
    const angle = startAngle + index * angleStep;
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build grid rings (20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Polygon points for flavor values
  const polygonPoints = labels
    .map((item, i) => {
      const ratio = Math.max(0.1, Math.min(1.0, item.val / 10));
      const pt = getPoint(i, ratio);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {rings.map((ring, idx) => {
          const ringPoints = labels
            .map((_, i) => {
              const pt = getPoint(i, ring);
              return `${pt.x},${pt.y}`;
            })
            .join(" ");
          return (
            <polygon
              key={idx}
              points={ringPoints}
              fill={idx === rings.length - 1 ? "rgba(255, 255, 255, 0.02)" : "none"}
              stroke="rgba(212, 175, 55, 0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axes Lines */}
        {labels.map((_, i) => {
          const pt = getPoint(i, 1.0);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={pt.x}
              y2={pt.y}
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(212, 175, 55, 0.35)"
          stroke="#F59E0B"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
        />

        {/* Vertex Markers & Labels */}
        {labels.map((item, i) => {
          const ratio = Math.max(0.1, Math.min(1.0, item.val / 10));
          const pt = getPoint(i, ratio);
          const outerPt = getPoint(i, 1.25);
          const labelText = locale === "vi" ? item.vi : item.en;

          return (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4"
                fill="#FBBF24"
                stroke="#18181B"
                strokeWidth="2"
                className="transition-all duration-500 hover:r-6 cursor-pointer"
              />
              <text
                x={outerPt.x}
                y={outerPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#E2E8F0"
                fontSize="11"
                fontWeight="500"
                className="tracking-wide"
              >
                {labelText} ({item.val})
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
