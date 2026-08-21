/**
 * Prismatic Lift style: an asset-free glass-shard interaction that echoes a modular AI system.
 * It deliberately uses CSS geometry rather than external sprite atlases so it remains portable and lightweight.
 */
import { useState, type PointerEvent } from "react";

const SHARDS = [
  { id: "voice", className: "prismatic-shard--voice" },
  { id: "memory", className: "prismatic-shard--memory" },
  { id: "core", className: "prismatic-shard--core" },
  { id: "reason", className: "prismatic-shard--reason" },
  { id: "action", className: "prismatic-shard--action" },
];

export default function PrismaticShards() {
  const [activeShard, setActiveShard] = useState<string | null>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    event.currentTarget.style.setProperty("--shard-x", `${x.toFixed(1)}px`);
    event.currentTarget.style.setProperty("--shard-y", `${y.toFixed(1)}px`);
  };

  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--shard-x", "0px");
    event.currentTarget.style.setProperty("--shard-y", "0px");
    setActiveShard(null);
  };

  return (
    <div className={`prismatic-shards ${activeShard ? "is-active" : ""}`} onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
      <div className="prismatic-crack prismatic-crack--one" />
      <div className="prismatic-crack prismatic-crack--two" />
      {SHARDS.map((shard) => (
        <div
          key={shard.id}
          className={`prismatic-shard ${shard.className} ${activeShard === shard.id ? "is-hot" : ""}`}
          onPointerEnter={() => setActiveShard(shard.id)}
        >
          <i />
        </div>
      ))}
    </div>
  );
}
