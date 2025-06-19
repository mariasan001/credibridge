import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts"

const rankingFinancieras = [
  { name: "Kueski", prestamos: 1240 },
  { name: "Creditea", prestamos: 980 },
  { name: "BBVA", prestamos: 870 },
  { name: "Banco Azteca", prestamos: 600 },
  { name: "Coppel", prestamos: 480 }
]

export default function RankingFinancierasMes() {
  const colores = ["#fb923c", "#f97316", "#f59e0b", "#fbbf24", "#fde68a"]

  return (
    <div style={{ width: "100%", height: 320, padding: "12px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={rankingFinancieras}
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
            formatter={(value: number) => `${value} préstamos`}
          />
          <Bar dataKey="prestamos" barSize={18} radius={[6, 6, 6, 6]}>
            {rankingFinancieras.map((entry, index) => (
              <Cell key={index} fill={colores[index % colores.length]} />
            ))}
            <LabelList
              dataKey="prestamos"
              position="right"
              style={{ fill: "#111827", fontWeight: 600, fontSize: 12 }}
              formatter={(value: number) => `${value}`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
