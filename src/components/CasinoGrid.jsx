import React from "react";
import { CASINO } from "../data.js";

export default function CasinoGrid({ cols = 2 }) {
  return (
    <div
      className="casino-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {CASINO.map((c, i) => (
        <button
          key={i}
          className="casino-tile"
          style={{
            background: c.g,
            backgroundImage: `url("${c.image}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <span>{c.name}</span>
        </button>
      ))}
    </div>
  );
}
