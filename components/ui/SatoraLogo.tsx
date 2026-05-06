import type { ReactNode } from "react";

interface SatoraLogoProps {
  className?: string;
}

export default function SatoraLogo({
  className = "",
}: SatoraLogoProps): ReactNode {
  return (
    <span
      className={`font-bold text-black dark:text-white select-none ${className}`}
    >
      satora
      <span
        className="inline-block rounded-full bg-lime-400 align-baseline"
        style={{ width: "0.3em", height: "0.3em", marginLeft: "0.05em" }}
      />
    </span>
  );
}
