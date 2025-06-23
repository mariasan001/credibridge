import { IncidenciasPorInstitucion } from "../model/ranking-dashboard.model";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";
import "./IncidenciasPorInstitucionSection.css";

interface Props {
  data: IncidenciasPorInstitucion[];
}

export default function IncidenciasPorInstitucionSection({ data }: Props) {
  // Encontrar la institución con más incidencias
  const maxValor = Math.max(...data.map((d) => d.incidencias7d));

  return (
    <section className="ranking-card1">
      <div className="ranking-card-header">
        <h3>🏢 Incidencias por Institución (últimos 7 días)</h3>
      </div>

     <ResponsiveContainer width="100%" height={Math.min(data.length * 60, 400)}>
  <BarChart
    data={data}
    layout="vertical"
    margin={{ top: 0, right: 60, left: -10, bottom: 10 }}
    barCategoryGap={12}
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
    <XAxis type="number" hide />
    <YAxis
      type="category"
      dataKey="institucion"
      width={180}
      tick={{ fontSize: 13, fill: "#1f2937", fontWeight: 400 }}
    />
    <Tooltip
      cursor={{ fill: "#f9fafb" }}
      contentStyle={{
        borderRadius: 8,
        background: "#ffffff",
        fontSize: 13,
        border: "1px solid #e5e7eb",
        color: "#111827",
      }}
      labelStyle={{ color: "#111827", fontWeight: 600 }}
    />
    <Bar dataKey="incidencias7d" barSize={18} radius={[6, 6, 6, 6]}>
      {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={entry.incidencias7d === maxValor ? "#f97316" : "#3b82f6"}
        />
      ))}
      <LabelList
        dataKey="incidencias7d"
        position="right"
        style={{ fill: "#111827", fontWeight: 600 }}
      />
    </Bar>
  </BarChart>
</ResponsiveContainer>

    </section>
  );
}
