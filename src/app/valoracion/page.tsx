"use client";

import useSWR from "swr";
import { PageLayout } from "@/components/PageLayout";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
} from "recharts";

import "./ValoracionFinanciera.css";
import { DashboardData } from "./types/DashboardData";
import { fetchDashboardData } from "./service/dashboardService";
import { CarteraHeader } from "./CarteraHeader";

export default function ValoracionFinancieraPage() {
    const { data, error, isLoading } = useSWR<DashboardData>(
        "admin-dashboard",
        fetchDashboardData
    );

    if (isLoading) return <p>Cargando...</p>;
    if (error || !data) return <p>Error al cargar el dashboard.</p>;

    const estrellasData = Object.entries(data.ratingsDistribution)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([star, cantidad]) => ({ estrellas: `${star} ⭐`, cantidad }));

    const promedioPorPregunta = Object.entries(data.averageScoresByQuestion).map(
        ([titulo, score]) => ({
            titulo,
            valor: Math.round((score / 5) * 100),
            color: "#008000",
            icono: "⭐",
        })
    );

    return (
        <PageLayout>
            <div className="valoracion-container">
           <CarteraHeader/>
                <div className="bloque-graficas">
                    <div className="tarjeta grafico-estrellas">
                        <h3>Distribución de Calificaciones</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={estrellasData} barGap={6}>
                                <XAxis type="number" hide />
                                <YAxis
                                    type="category"
                                    dataKey="estrellas"
                                    tick={{ fontSize: 15, fontWeight: "bold", fill: "#374151" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        borderRadius: 8,
                                        border: "1px solid #e5e7eb",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                    }}
                                    formatter={(value: number) => [`${value} votos`, "Estrellas"]}
                                />
                                <Bar
                                    dataKey="cantidad"
                                    radius={[8, 8, 8, 8]}
                                    fill="#353839"
                                    background={{ fill: "#353839" }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grafico-promedio">
                        <h3 className="titulo-promedio">Promedio General</h3>

                        <div className="radial-wrapper">
                            <RadialBarChart
                                width={200}
                                height={160}
                                cx="50%"
                                cy="100%"
                                innerRadius="80%"
                                outerRadius="100%"
                                barSize={16}
                                startAngle={180}
                                endAngle={0}
                                data={[
                                    { name: "Base", value: 100, fill: "#f3f4f6" },
                                    {
                                        name: "Promedio",
                                        value: (data.averageRating / 5) * 100,
                                        fill: "url(#gradPromedio)",
                                    },
                                ]}
                            >
                                <defs>
                                    <linearGradient id="gradPromedio" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#34d399" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                                <RadialBar dataKey="value" cornerRadius={10} />
                            </RadialBarChart>
                        </div>

                        <div className="promedio-label">
                            <span className="score">{data.averageRating.toFixed(1)}</span>
                            <span className="slash">/ 5</span>
                            <p className="nota">
                                Promedio basado en <strong>{data.totalResponses}</strong> valoraciones
                            </p>
                        </div>
                    </div>

                </div>

                <div className="bloque-indicadores">
                    <h3>Indicadores Clave de Servicio</h3>
                    <div className="indicadores-grid">
                        {promedioPorPregunta.map((item, idx) => (
                            <div key={idx} className="indicador-card">
                                <div className="indicador-header">
                                    <span className="icono" style={{ fontSize: 24 }}>{item.icono}</span>
                                    <span className="titulo">{item.titulo}</span>
                                </div>
                                <div className="barra-externa">
                                    <div
                                        className="barra-interna"
                                        style={{
                                            width: `${item.valor}%`,
                                            backgroundColor: item.color,
                                            transition: "width 0.6s ease",
                                        }}
                                    ></div>
                                </div>
                                <p className="porcentaje">{item.valor}% satisfacción</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bloque-opiniones">
                    <h3>Comentarios de los Clientes</h3>
                    <ul className="lista-opiniones">
                        {data.comments.map((comentario, idx) => (
                            <li key={idx} className="opinion-item">
                                {comentario}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PageLayout>
    );
}
