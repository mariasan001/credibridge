"use client";

import { useEffect, useMemo, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ContratosPorMes } from "../../model/contractsDashboard.model";


interface Props {
    data: ContratosPorMes[];
}

export default function GraficaTotalContratos({ data }: Props) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [periodoActivo, setPeriodoActivo] = useState("Mes");

    // Agrupamos la data por mes
    const prestamosData = useMemo(() => {
        const agrupado: Record<string, { otorgados: number; enProceso: number }> = {};

        data.forEach((item) => {
            if (!agrupado[item.mes]) {
                agrupado[item.mes] = { otorgados: 0, enProceso: 0 };
            }
            if (item.estatus === "ACTIVO") {
                agrupado[item.mes].otorgados += item.total;
            } else {
                agrupado[item.mes].enProceso += item.total;
            }
        });

        return Object.entries(agrupado).map(([mes, valores]) => ({
            mes,
            ...valores,
        }));
    }, [data]);

    const totalOtorgados = prestamosData.reduce(
        (acc, item) => acc + item.otorgados,
        0
    );

    const currentData = hoverIndex !== null ? prestamosData[hoverIndex] : null;

    const porcentajeCambio = useMemo(() => {
        if (prestamosData.length < 2) return null;
        const penultimo = prestamosData[prestamosData.length - 2]?.otorgados || 0;
        const ultimo = prestamosData[prestamosData.length - 1]?.otorgados || 0;
        if (penultimo === 0) return null;
        return (((ultimo - penultimo) / penultimo) * 100).toFixed(2);
    }, [prestamosData]);

    return (
        <div className="grafico-box">
            <div className="grafico-header">
                <p className="grafico-title">Total de Contratos</p>
                <div className="switches">
                    <button className="active">Mes</button>
                    <button disabled>Trimestre</button>
                    <button disabled>Año</button>
                </div>
            </div>

            <div className="monto-dinamico">
                <span className="simbolo">N° </span>
                <span className="monto-num">
                    {currentData
                        ? currentData.otorgados.toLocaleString("es-MX")
                        : totalOtorgados.toLocaleString("es-MX")}
                </span>
                {porcentajeCambio && (
                    <span
                        className={`porcentaje-cambio ${parseFloat(porcentajeCambio) >= 0 ? "positivo" : "negativo"
                            }`}
                    >
                        {parseFloat(porcentajeCambio) >= 0 ? "▲" : "▼"}{" "}
                        {Math.abs(parseFloat(porcentajeCambio)).toFixed(2)}%
                    </span>
                )}
            </div>
            <div className="grafico-legend">
                <div className="leyenda-item">
                    <span className="dot naranja"></span> Otorgados
                </div>
                <div className="leyenda-item">
                    <span className="dot gris"></span> En proceso
                </div>
            </div>

            <div className="grafico-cuerpo">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart
                        data={prestamosData}
                        onMouseMove={(e: any) => {
                            if (e.activeTooltipIndex !== undefined) {
                                setHoverIndex(e.activeTooltipIndex);
                            }
                        }}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        <defs>
                            <linearGradient id="colorOtorgados" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#fb923c" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#fb923c" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                color: "#111827",
                            }}
                            formatter={(value: number) => `N° ${value}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="otorgados"
                            stroke="#fb923c"
                            strokeWidth={3}
                            name="Otorgados"
                            dot={{ fill: "#fb923c", r: 3 }}
                            activeDot={{ r: 6 }}
                            fill="url(#colorOtorgados)"
                        />
                        <Line
                            type="monotone"
                            dataKey="enProceso"
                            stroke="#6b7280"
                            strokeDasharray="2 4"
                            strokeWidth={2}
                            name="En proceso"
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
