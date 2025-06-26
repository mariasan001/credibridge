"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useDashboard } from "../hook/useDashboard";
import "./DashboardHistorialContratos.css";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <strong>{label}</strong>
        <span>Contratos cerrados: {payload[0].value}</span>
      </div>
    );
  }
  return null;
};

export function DashboardHistorialContratos() {
  const { data, error, loading } = useDashboard();
  const [vista, setVista] = useState<"mes" | "trimestre" | "anio">("mes");

  const currentYear = new Date().getFullYear();

  const formattedData = useMemo(() => {
    if (!data) return [];

    const filtered = data.contratosCerradosPorMes.filter((item) =>
      item.month.startsWith(`${currentYear}-`)
    );

    if (vista === "mes") {
      const porMes = Array(12).fill(0);
      filtered.forEach((item) => {
        const mes = parseInt(item.month.split("-")[1], 10) - 1;
        porMes[mes] += item.contractCount;
      });
      return porMes.map((value, i) => ({
        label: MESES_ES[i],
        contractCount: value,
      }));
    }

    if (vista === "trimestre") {
      const trimestres = [0, 0, 0, 0];
      filtered.forEach((item) => {
        const mes = parseInt(item.month.split("-")[1], 10);
        const index = Math.floor((mes - 1) / 3);
        trimestres[index] += item.contractCount;
      });
      return trimestres.map((value, i) => ({
        label: `T${i + 1}`,
        contractCount: value,
      }));
    }

    // Vista por año
    const grouped: Record<string, number> = {};
    data.contratosCerradosPorMes.forEach((item) => {
      const year = item.month.split("-")[0];
      grouped[year] = (grouped[year] || 0) + item.contractCount;
    });
    return Object.entries(grouped)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([label, contractCount]) => ({ label, contractCount }));
  }, [data, vista]);

  if (loading || !data) return null;
  if (error) return <p className="error-msg">{error}</p>;
  if (!formattedData.length) return <p>No hay datos para mostrar.</p>;

  return (
    <motion.div
      className="dashboard-historial"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="historial-header">
        <h3>Contratos cerrados</h3>
        <div className="tabs">
          {["mes", "trimestre", "anio"].map((v) => (
            <button
              key={v}
              className={`tab ${vista === v ? "active" : ""}`}
              onClick={() => setVista(v as any)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={vista}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="contractCount"
                stroke="#2D9CDB"
                fill="#E6F4FD"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
