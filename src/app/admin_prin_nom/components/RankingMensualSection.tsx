import { RankingMensual } from "../model/ranking-dashboard.model";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./RankingMensualSection.css";
import { ArrowUpRight } from "lucide-react";

interface Props {
  data: RankingMensual[];
}

export default function RankingMensualSection({ data }: Props) {
  const totalIncidencias = data.reduce(
    (acc, curr) =>
      acc +
      (curr.atendidas || 0) +
      (curr.expiradas || 0) +
      (curr.activas || 0),
    0
  );

  const mesesTraducidos: Record<string, string> = {
    "2025-01": "Ene",
    "2025-02": "Feb",
    "2025-03": "Mar",
    "2025-04": "Abr",
    "2025-05": "May",
    "2025-06": "Jun",
    "2025-07": "Jul",
    "2025-08": "Ago",
    "2025-09": "Sep",
    "2025-10": "Oct",
    "2025-11": "Nov",
    "2025-12": "Dic",
  };

  const dataTransformada = data.map((d) => ({
    ...d,
    atendidas: d.atendidas ?? 0,
    expiradas: d.expiradas ?? 0,
    activas: d.activas ?? 0,
    mesLabel: mesesTraducidos[d.mes] || d.mes,
  }));

  return (
    <section className="ranking-card">
      <div className="ranking-card-header">
        <div>
          <h3>Total de Incidencias</h3>
          <div className="ranking-total">
            <span className="ranking-total-num">{totalIncidencias}</span>
            <span className="ranking-total-diff">
              <ArrowUpRight size={16} />
              +22.41%
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dataTransformada}>
          <defs>
            <linearGradient id="colorAtendidas" x1="0" y1="0" x2="0" y2="1">
             
            </linearGradient>
            <linearGradient id="colorExpiradas" x1="0" y1="0" x2="0" y2="1">
           
            </linearGradient>
            <linearGradient id="colorActivas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="mesLabel"
            tick={{ fontSize: 12, fill: "#111827" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis tick={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              fontSize: 13,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: "#111827",
            }}
          />

          <Area
            type="monotone"
            dataKey="atendidas"
            stroke="#fb923c"
            fill="url(#colorAtendidas)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Atendidas"
          />
          <Area
            type="monotone"
            dataKey="expiradas"
            stroke="#111827"
            fill="url(#colorExpiradas)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            name="Expiradas"
          />
          <Area
            type="monotone"
            dataKey="activas"
            stroke="#3b82f6"
            fill="url(#colorActivas)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Activas"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}
