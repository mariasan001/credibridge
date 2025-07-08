import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";
import { useState } from "react";
import { PrestamosPorFinanciera } from "../../model/contractsDashboard.model";

interface Props {
  data: PrestamosPorFinanciera[];
}

export default function RankingFinancierasMes({ data }: Props) {
  const [verTodas, setVerTodas] = useState(false);

  const colores = ["#fb923c", "#f97316", "#f59e0b", "#fbbf24", "#fde68a"];

  // Ordenar descendente por cantidadPrestamo
  const sortedData = [...data].sort(
    (a, b) => b.cantidadPrestamo - a.cantidadPrestamo
  );

  // Truncar nombre si es muy largo
  const truncate = (text: string, max = 15) =>
    text.length > max ? text.slice(0, max - 1) + "…" : text;

  const chartData = sortedData.map((item) => ({
    name: truncate(item.financiera),
    prestamos: item.cantidadPrestamo
  }));

  // Mostrar solo top 10 si no está expandido
  const visibleData = verTodas ? chartData : chartData.slice(0, 10);

  return (
    <div>
      <div style={{ width: "100%", maxHeight: verTodas ? "420px" : "auto", overflowY: verTodas ? "auto" : "hidden", paddingRight: "8px" }}>
        <div style={{ height: visibleData.length * 40 + 40 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={visibleData}
              margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
              barCategoryGap={16}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 13, fill: "#111827", fontWeight: 500 }}
                width={110}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  color: "#111827",
                  fontSize: "12px"
                }}
                formatter={(value: number) =>
                  `${value.toLocaleString("es-MX")} préstamos`
                }
              />
              <Bar dataKey="prestamos" barSize={18} radius={[6, 6, 6, 6]}>
                {visibleData.map((_, index) => (
                  <Cell key={index} fill={colores[index % colores.length]} />
                ))}
                <LabelList
                  dataKey="prestamos"
                  position="right"
                  style={{ fill: "#111827", fontWeight: 600, fontSize: 12 }}
                  formatter={(value: number) =>
                    `${value.toLocaleString("es-MX")}`
                  }
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Botón Ver más / Ver menos */}
      {chartData.length > 10 && (
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <button
            onClick={() => setVerTodas(!verTodas)}
            style={{
              padding: "6px 14px",
              fontSize: "0.85rem",
              backgroundColor: "#f97316",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s ease"
            }}
          >
            {verTodas ? "Ver menos" : "Ver más"}
          </button>
        </div>
      )}
    </div>
  );
}
