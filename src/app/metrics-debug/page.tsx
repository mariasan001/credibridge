"use client";

import { useEffect, useMemo, useState } from "react";
import "./metrics-debug.css";
import {
  Info, Activity, MousePointer2, Image as ImageIcon, Network, LayoutDashboard
} from "lucide-react";

/** ===== Tipos ===== */
type Row = { ts: number } & Record<string, any>;
type Group = { key: string; kind: string; label: string; items: Row[]; dts: number[] };
type Thresholds = { ok: number; warn: number }; // >= warn => rojo (bad)

/** ===== Conocimiento por tipo (texto para humanos) ===== */
const KIND_INFO: Record<
  string,
  {
    label: string;
    icon: JSX.Element;
    what: string;
    why: string[];
    how: string[];
    thresholds: Thresholds; // p95 en ms
  }
> = {
  vital: {
    label: "Web Vitals",
    icon: <Activity className="icon" />,
    what: "Indicadores de experiencia real (LCP, INP, CLS).",
    why: [
      "Imágenes o fuentes grandes bloqueando el render.",
      "JS pesado en el hilo principal (long tasks).",
      "Layout que salta por cargar tarde (CLS).",
    ],
    how: [
      "Optimiza imágenes (next/image, formatos modernos).",
      "Divide JS por ruta y usa lazy para vistas pesadas.",
      "Reserva espacio (width/height) para evitar CLS.",
    ],
    thresholds: { ok: 2500, warn: 4000 }, // LCP p95
  },
  route: {
    label: "Navegación SPA",
    icon: <LayoutDashboard className="icon" />,
    what: "Tiempo a primer paint tras un cambio de ruta.",
    why: [
      "Demasiadas peticiones al montar.",
      "Estado global pesado o hidratar muchos componentes.",
      "Bloqueos del main thread por trabajo síncrono.",
    ],
    how: [
      "Prefetch de datos/recursos críticos.",
      "useMemo/useCallback en listas; carga progresiva.",
      "Mover trabajo caro al servidor / web worker.",
    ],
    thresholds: { ok: 600, warn: 1200 },
  },
  api: {
    label: "API (cliente)",
    icon: <Network className="icon" />,
    what: "Latencia desde el front (request → response).",
    why: [
      "Backend lento o sin cache.",
      "Roundtrips innecesarios / N+1 requests.",
      "Red móvil inestable (alto RTT).",
    ],
    how: [
      "Cachea (HTTP, SWR/React Query) y usa batching.",
      "Reduce payloads y comprime (gzip/br).",
      "CDN/edge para endpoints estáticos.",
    ],
    thresholds: { ok: 400, warn: 1000 },
  },
  resource: {
    label: "Recursos",
    icon: <ImageIcon className="icon" />,
    what: "Carga de imágenes, scripts y CSS (duración y TTFB).",
    why: [
      "Imágenes gigantes o sin lazy.",
      "Bundles JS grandes / sin code-splitting.",
      "CDN mal configurada o lejana.",
    ],
    how: [
      "Lazy + tamaños correctos; usa AVIF/WebP.",
      "Divide por ruta y elimina dependencias muertas.",
      "Usa CDN cercana con cache y HTTP/2+.",
    ],
    thresholds: { ok: 800, warn: 1500 },
  },
  longtask: {
    label: "Long Tasks",
    icon: <MousePointer2 className="icon" />,
    what: "Bloqueos >50ms del hilo principal (jank/lag).",
    why: [
      "Trabajo síncrono pesado en render.",
      "Librerías que hacen mucho en mount.",
      "Loops o parsers grandes en el cliente.",
    ],
    how: [
      "Trocea trabajo (requestIdleCallback, setTimeout).",
      "Mueve cálculos a Web Worker.",
      "Evita lógica pesada en efectos.",
    ],
    thresholds: { ok: 50, warn: 100 }, // p95 de duración
  },
  component: {
    label: "Montaje de componente",
    icon: <Info className="icon" />,
    what: "Tiempo en montar/hidratar una vista o card.",
    why: [
      "Demasiados hijos o listas sin virtualizar.",
      "Cálculos caros al render.",
      "Demasiados efectos iniciales.",
    ],
    how: [
      "Virtualiza listas (react-virtual).",
      "Memoiza cálculos y props pesadas.",
      "Carga diferida de subcomponentes.",
    ],
    thresholds: { ok: 100, warn: 300 },
  },
  ui: {
    label: "Eventos UI",
    icon: <Info className="icon" />,
    what: "Eventos personalizados (clics, abrir/cerrar modal, etc.).",
    why: [
      "Handlers con trabajo pesado.",
      "Re-render de árbol grande por estado global.",
    ],
    how: [
      "Optimiza handlers; usa startTransition si aplica.",
      "Lleva estado a local cuando puedas.",
    ],
    thresholds: { ok: 100, warn: 300 },
  },
};

/** ===== Utils ===== */
function pct(arr: number[], p: number) {
  if (!arr.length) return 0;
  const s = arr.slice().sort((a, b) => a - b);
  const i = Math.floor((p / 100) * (s.length - 1));
  return Number(s[i].toFixed(2));
}
function fmt(ms: number) {
  if (!isFinite(ms)) return "0";
  if (ms < 1000) return `${ms.toFixed(0)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}
function statusByP95(kind: string, v: number) {
  const t = KIND_INFO[kind]?.thresholds || { ok: 600, warn: 1200 };
  if (v < t.ok) return { k: "ok" as const };
  if (v < t.warn) return { k: "warn" as const };
  return { k: "bad" as const };
}

/** ===== Data ===== */
function useRUM() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    try {
      const payload = JSON.parse(localStorage.getItem("RUM_LAST") || '{"data":[]}');
      setRows(payload.data || []);
    } catch {}
  }, []);
  return rows;
}

/** ===== UI Aux ===== */
function Legend() {
  return (
    <div className="legend">
      <span className="dot ok"></span> Verde = OK ·
      <span className="dot warn"></span> Amarillo = Atención ·
      <span className="dot bad"></span> Rojo = Crítico
    </div>
  );
}

function WhatCard({ kind }: { kind: string }) {
  const info = KIND_INFO[kind];
  if (!info) return null;
  return (
    <div className="what-card">
      <div className="what-head">
        {info.icon}
        <strong>{info.label}</strong>
      </div>
      <p className="what-what">{info.what}</p>
      <div className="what-cols">
        <div>
          <h4>¿Por qué puede pasar?</h4>
          <ul>{info.why.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </div>
        <div>
          <h4>¿Cómo mejorarlo?</h4>
          <ul>{info.how.map((h, i) => <li key={i}>{h}</li>)}</ul>
        </div>
      </div>
      <div className="what-thr">
        Umbrales p95:&nbsp;
        <b className="pill ok">OK &lt; {KIND_INFO[kind].thresholds.ok}ms</b>
        <b className="pill warn">{KIND_INFO[kind].thresholds.ok}–{KIND_INFO[kind].thresholds.warn}ms</b>
        <b className="pill bad">&gt;= {KIND_INFO[kind].thresholds.warn}ms</b>
      </div>
    </div>
  );
}

/** ===== Sparkline SVG sin libs ===== */
function Spark({ values }: { values: number[] }) {
  const width = 240, height = 70, pad = 6;
  if (!values.length) return <div className="spark-empty">sin datos</div>;
  const max = Math.max(...values), min = Math.min(...values);
  const n = values.length, W = width - pad * 2, H = height - pad * 2;
  const toXY = (v: number, i: number) => {
    const x = pad + (i / (n - 1)) * W;
    const y = pad + (1 - (v - min) / Math.max(1, max - min)) * H;
    return `${x},${y}`;
  };
  const pts = values.map(toXY);
  const line = `M ${pts[0]} L ${pts.join(" ")}`;
  const area = `M ${pad},${height - pad} L ${pts.join(" ")} L ${width - pad},${height - pad} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="spark-svg">
      <path d={area} className="spark-area" />
      <path d={line} className="spark-line" />
    </svg>
  );
}

/** ===== Página ===== */
export default function MetricsDebugPage() {
  const rows = useRUM();

  // Agrupar eventos
  const groups: Group[] = useMemo(() => {
    const map = new Map<string, Row[]>();
    for (const r of rows) {
      const label = r.name || r.path || r.url || "__";
      const key = `${r.kind}:${label}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }
    const list: Group[] = [];
    for (const [key, items] of map.entries()) {
      const [kind, ...rest] = key.split(":");
      const label = rest.join(":");
      const dts = items.map(i => Number(i.dt || i.dur || i.mount_ms || i.value || 0)).filter(Number.isFinite);
      list.push({ key, kind, label, items, dts });
    }
    return list.sort((a,b)=> pct(b.dts,95) - pct(a.dts,95));
  }, [rows]);

  // Filtros + KPIs
  const kinds = useMemo(() => Array.from(new Set(groups.map(g => g.kind))).sort(), [groups]);
  const [kind, setKind] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => groups.filter(g => (kind === "all" ? true : g.kind === kind) && g.label.toLowerCase().includes(q.toLowerCase())),
    [groups, kind, q]
  );

  const all = groups.flatMap(g => g.dts);
  const kpi = { total: rows.length, p50: pct(all,50), p95: pct(all,95), p99: pct(all,99) };
  const health = statusByP95("route", kpi.p95); // salud global aprox (usa umbral de route)

  // Exportar
  function exportJSON() {
    const payload = JSON.stringify({ at: new Date().toISOString(), data: rows }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `rum-${Date.now()}.json`; a.click(); URL.revokeObjectURL(a.href);
  }
  function generateReport() {
    const worst = groups.slice(0,5).map(g => `• ${g.kind} · ${g.label} → p95 ${fmt(pct(g.dts,95))} (n=${g.dts.length})`).join("\n");
    const md = [
      `# RUM Report — ${new Date().toLocaleString()}`,
      ``,
      `**Eventos:** ${kpi.total} · **p50:** ${fmt(kpi.p50)} · **p95:** ${fmt(kpi.p95)} · **p99:** ${fmt(kpi.p99)}`,
      ``,
      `## Top 5 peores (p95)`, worst,
      ``,
      `## Nota`,
      `Usa los paneles de ayuda por tipo (Web Vitals, API, etc.) para priorizar fixes.`,
    ].join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `rum-report-${Date.now()}.md`; a.click(); URL.revokeObjectURL(a.href);
  }

  return (
    <main className="mdp-root">
      {/* Header */}
      <div className="mdp-header">
        <div className="mdp-header-row">
          <h1 className="mdp-title">RUM Debug</h1>
          <span className={`mdp-health mdp-health--${health.k}`}>Salud (p95): {fmt(kpi.p95)}</span>
          <button className="mdp-btn mdp-btn--ghost" onClick={exportJSON}>Exportar JSON</button>
          <button className="mdp-btn mdp-btn--primary" onClick={generateReport}>Generar Reporte</button>
        </div>
      </div>

      {/* Content */}
      <div className="mdp-container grid-two">
        {/* Main */}
        <div>
          {/* Filtros */}
          <div className="mdp-filters">
            <select className="mdp-input" value={kind} onChange={e=>setKind(e.target.value)}>
              <option value="all">Todos los kind</option>
              {kinds.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <input className="mdp-input mdp-input--stretch" placeholder="Buscar por nombre / url / path" value={q} onChange={e=>setQ(e.target.value)} />
          </div>

          {/* Tarjetas */}
          <div className="mdp-grid">
            {filtered.map(g=>{
              const p50 = pct(g.dts,50), p95 = pct(g.dts,95), p99 = pct(g.dts,99);
              const st  = statusByP95(g.kind, p95);
              return (
                <section key={g.key} className="mdp-card">
                  <header className="mdp-card-header">
                    <span className="mdp-kind">{g.kind}</span>
                    <h3 className="mdp-card-title" title={g.label}>{g.label}</h3>
                    <span className={`mdp-badge mdp-badge--${st.k}`}>p95 {fmt(p95)}</span>
                  </header>
                  <div className="mdp-card-body">
                    <div className="card-left">
                      <div className="mdp-meta">n={g.dts.length}</div>
                      <div className="mdp-chips">
                        <span className="mdp-chip">p50 {fmt(p50)}</span>
                        <span className="mdp-chip">p99 {fmt(p99)}</span>
                      </div>
                    </div>
                    <div className="card-right">
                      <Spark values={g.dts.slice(-60)} />
                    </div>
                  </div>
                  <details className="mdp-details">
                    <summary>Ver últimos eventos</summary>
                    <pre className="mdp-pre">{JSON.stringify(g.items.slice(-20), null, 2)}</pre>
                  </details>
                  <details className="mdp-details">
                    <summary>¿Qué significa esta métrica?</summary>
                    <div className="mdp-explain"><WhatCard kind={g.kind} /></div>
                  </details>
                </section>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mdp-empty">No hay grupos para los filtros actuales.</div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="side">
          <section className="panel">
            <h4 className="ttl">KPIs globales</h4>
            <div className="kpi-grid">
              <div><span>Eventos</span><b>{kpi.total}</b></div>
              <div><span>p50</span><b>{fmt(kpi.p50)}</b></div>
              <div><span>p95</span><b>{fmt(kpi.p95)}</b></div>
              <div><span>p99</span><b>{fmt(kpi.p99)}</b></div>
            </div>
            <Legend />
          </section>

          <section className="panel">
            <h4 className="ttl">Notas del tipo seleccionado</h4>
            <WhatCard kind={kind === "all" ? (kinds[0] || "route") : kind} />
          </section>
        </aside>
      </div>
    </main>
  );
}
