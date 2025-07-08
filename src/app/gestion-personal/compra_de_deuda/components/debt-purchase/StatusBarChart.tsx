import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { DebtPurchase } from "../../model/DebtPurchase";
import "./status-line-chart.css";

type GroupBy = "semana" | "mes" | "año";

type Props = {
    solicitudes: DebtPurchase[];
};

const getGroupKey = (dateStr: string, groupBy: GroupBy): string => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    if (groupBy === "semana") {
        const firstDay = new Date(year, 0, 1);
        const days = Math.floor((+date - +firstDay) / (24 * 60 * 60 * 1000));
        const week = Math.ceil((days + firstDay.getDay() + 1) / 7);
        return `S${week} ${year}`;
    }
    if (groupBy === "mes") {
        const mes = date.toLocaleDateString("es-MX", { month: "short" }).replace(".", "").toUpperCase();
        return `${mes} ${year}`;
    }
    return `${year}`;
};

const StatusLineChart: React.FC<Props> = ({ solicitudes }) => {
    const [groupBy, setGroupBy] = useState<GroupBy>("mes");
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    if (solicitudes.length === 0) return null;

    const grouped: Record<string, Record<string, number>> = {};
    solicitudes.forEach((s) => {
        const key = getGroupKey(s.createdAt, groupBy);
        if (!grouped[key]) grouped[key] = {};
        grouped[key][s.status] = (grouped[key][s.status] || 0) + 1;
    });

    const sortedKeys = Object.keys(grouped).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const allStatuses = Array.from(new Set(solicitudes.map((s) => s.status)));

    const chartData = sortedKeys.map((key) => {
        const row: Record<string, any> = { periodo: key };
        allStatuses.forEach((status) => {
            row[status] = grouped[key]?.[status] || 0;
        });
        return row;
    });

    const colors = ["#F68B2C", "#9DB2BF", "#B5D3C6", "#D4A5A5", "#8ECAE6"];

    return (
        <div className="grafico-box">
            <div className="grafico-header">
                <p className="grafico-title">Total de Contratos</p>
                <div className="switches">
                    <button className={groupBy === "mes" ? "active" : ""} onClick={() => setGroupBy("mes")}>Mes</button>
                    <button className={groupBy === "semana" ? "active" : ""} onClick={() => setGroupBy("semana")}>Semana</button>
                    <button className={groupBy === "año" ? "active" : ""} onClick={() => setGroupBy("año")}>Año</button>
                </div>
            </div>

            <div className="grafico-legend">
                {allStatuses.map((status, i) => {
                    let color = colors[i % colors.length];
                    if (i === 0) color = "#F68B2C"; // naranja para el primero
                    else if (i === 1) color = "#000000"; // negro punteado

                    return (
                        <div className="leyenda-item" key={status}>
                            <span className="dot" style={{ backgroundColor: color }}></span>
                            {status}
                        </div>
                    );
                })}
            </div>

            <div className="grafico-cuerpo">
                <ResponsiveContainer width="100%" height="200%">
                    <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 15, left: 0, bottom: 10 }}
                        onMouseMove={(e: any) => {
                            if (e.activeTooltipIndex !== undefined) setHoverIndex(e.activeTooltipIndex);
                        }}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <defs>
                            <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#F68B2C" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#F68B2C" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="periodo" tick={{ fontSize: 12 }} stroke="#ccc" />
                        <YAxis tick={{ fontSize: 12 }} stroke="#ccc" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                color: "#111827",
                                fontSize:""
                            }}
                            formatter={(value: number) => `N° ${value}`}
                        />
                        {allStatuses.map((status, index) => {
                            let stroke = colors[index % colors.length];
                            let strokeDasharray: string | undefined;
                            let strokeWidth = 3;
                            let fill = "none";
                            let dot = { r: 4 };

                            if (index === 0) {
                                stroke = "#F68B2C"; // naranja
                                fill = "url(#colorPrincipal)";
                            } else if (index === 1) {
                                stroke = "#000000";
                                strokeDasharray = "1 6";
                                strokeWidth = 1.5;
                            }

                            return (
                                <Line
                                    key={status}
                                    type="monotone"
                                    dataKey={status}
                                    stroke={stroke}
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={strokeDasharray}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    dot={dot}
                                    activeDot={{ r: 6 }}
                                    fill={fill}
                                />
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatusLineChart;
