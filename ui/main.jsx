import React, { useEffect, useMemo, useState } from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";

const e = React.createElement;

function clamp01(n) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function useBeliefSystem() {
  const [belief, setBelief] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("../belief_system.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive) return;
        setBelief(j);
      })
      .catch(() => {
        if (!alive) return;
        setBelief(null);
      });
    return () => {
      alive = false;
    };
  }, []);

  return belief;
}

function Island() {
  const belief = useBeliefSystem();
  const hasBelief = Boolean(belief);

  const loveResonance = useMemo(() => {
    if (!belief) return 0.2;
    const v = belief.love_resonance ?? (belief.love && belief.love.resonance) ?? 0.7;
    return clamp01(Number(v));
  }, [belief]);

  const periodMs = useMemo(() => {
    // Чем выше резонанс, тем спокойнее и увереннее пульс.
    // 0.0 -> 2200ms (быстрее), 1.0 -> 4200ms (медленнее)
    return Math.round(2200 + 2000 * loveResonance);
  }, [loveResonance]);

  const auraOpacity = useMemo(() => 0.45 + 0.45 * loveResonance, [loveResonance]);
  const coreOpacity = useMemo(() => 0.35 + 0.55 * loveResonance, [loveResonance]);

  const styles = {
    "--period": `${periodMs}ms`,
    "--auraOpacity": `${auraOpacity}`,
    "--coreOpacity": `${coreOpacity}`,
  };

  const state = hasBelief ? "linked" : "seeking";

  return e(
    "div",
    { className: "scene" },
    e(
      "div",
      { className: "islandWrap", style: styles, "data-state": state },
      e("div", { className: "aura" }),
      e("div", { className: "island" }),
      e("div", { className: "core" }),
      e(
        "div",
        { className: "label" },
        e("strong", null, "Центральный остров"),
        " — ",
        hasBelief
          ? `пульс резонанса: ${loveResonance.toFixed(2)}`
          : "ожидание Яйца Ангела…"
      )
    )
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(e(Island));
}

