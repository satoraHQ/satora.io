"use client";

import { useEffect, useState } from "react";

const NODES = [
  { cx: 20, cy: 18, label: "BTC", icon: "/assets/chains/bitcoin.svg" },
  { cx: 50, cy: 15, label: "USDC", icon: "/assets/chains/usdc.svg" },
  { cx: 42, cy: 42, label: "USDT", icon: "/assets/chains/usdt.svg" },
  { cx: 15, cy: 40, label: "LN", icon: "/assets/chains/lightning.svg" },
];

const CONNECTIONS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 0 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
];

export default function Globe() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Globe wireframe circles */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-gray-300 dark:text-white/10"
        />
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-gray-300 dark:text-white/10"
        />
        <circle
          cx="50"
          cy="50"
          r="16"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-gray-300 dark:text-white/10"
        />

        {/* Latitude lines */}
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="14"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-gray-300 dark:text-white/10"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="28"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-gray-300 dark:text-white/10"
        />

        {/* Longitude lines */}
        <ellipse
          cx="50"
          cy="50"
          rx="14"
          ry="42"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-gray-300 dark:text-white/10"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="28"
          ry="42"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-gray-300 dark:text-white/10"
        />

        {/* Connection lines */}
        {CONNECTIONS.map((conn, i) => {
          const from = NODES[conn.from];
          const to = NODES[conn.to];
          const isActive = conn.from === activeNode || conn.to === activeNode;
          return (
            <line
              key={i}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="currentColor"
              strokeWidth="0.4"
              className={isActive
                ? "text-gray-300 dark:text-white/10"
                : "text-gray-200 dark:text-white/5"}
              style={{ transition: "color 0.3s" }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isActive = i === activeNode;
          const iconSize = isActive ? 6 : 5;
          return (
            <g key={i}>
              {/* Pulse ring */}
              {isActive && (
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-lime-light"
                >
                  <animate
                    attributeName="r"
                    from="3"
                    to="10"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Dot (inactive) or Icon (active) */}
              {isActive
                ? (
                  <image
                    href={node.icon}
                    x={node.cx - iconSize / 2}
                    y={node.cy - iconSize / 2}
                    width={iconSize}
                    height={iconSize}
                    style={{
                      transition: "all 0.3s",
                      filter: "grayscale(1)",
                      opacity: 0.5,
                    }}
                  />
                )
                : (
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={1.5}
                    fill="currentColor"
                    className="text-gray-300 dark:text-white/15"
                  />
                )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
