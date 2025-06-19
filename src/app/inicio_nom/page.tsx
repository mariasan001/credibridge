"use client"

import { useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    RadialBarChart,
    RadialBar,
} from "recharts"

import "./InicioNomina.css"
import RankingFinancierasMes from "./components/ui/Card"

const financierasData = [
    { name: "Kueski", positivos: 120, quejas: 5 },
    { name: "Creditea", positivos: 95, quejas: 8 },
    { name: "BBVA", positivos: 80, quejas: 12 },
    { name: "Coppel", positivos: 60, quejas: 25 },
    { name: "Banco Azteca", positivos: 40, quejas: 30 },
]

const prestamosData = [
    { mes: "Ene", otorgados: 120, enProceso: 80 },
    { mes: "Feb", otorgados: 150, enProceso: 90 },
    { mes: "Mar", otorgados: 200, enProceso: 110 },
    { mes: "Abr", otorgados: 180, enProceso: 130 },
    { mes: "May", otorgados: 245, enProceso: 150 },
    { mes: "Jun", otorgados: 260, enProceso: 170 },
    { mes: "Jul", otorgados: 300, enProceso: 190 },
    { mes: "Ago", otorgados: 320, enProceso: 210 },
    { mes: "Sep", otorgados: 280, enProceso: 200 },
    { mes: "Oct", otorgados: 310, enProceso: 220 },
    { mes: "Nov", otorgados: 330, enProceso: 230 },
    { mes: "Dic", otorgados: 360, enProceso: 250 },
]
const aclaracionesPorMes = [
    { mes: "Ene", valor: 10, fill: "#fde0c5" },
    { mes: "Feb", valor: 15, fill: "#fcb794" },
    { mes: "Mar", valor: 20, fill: "#fb923c" },
    { mes: "Abr", valor: 25, fill: "#f97316" },
]
const indicadoresGarantia = [
    {
        titulo: "Solicitudes de Prestamos",
        valor: 9456,
        meta: 12000,
        icono: "🚗",
        color: "#f97316",
    },
    {
        titulo: "Reportes Levantados",
        valor: 420,
        meta: 600,
        icono: "📄",
        color: "#f59e0b",
    },
    {
        titulo: "Quejas Presentadas",
        valor: 270,
        meta: 500,
        icono: "❗",
        color: "#ef4444",
    },
]


const top3Financieras = [...financierasData]
    .sort((a, b) => (b.positivos - b.quejas) - (a.positivos - a.quejas))
    .slice(0, 3)

const porcentajeAclaraciones = 42

const gaugeData = [
    {
        name: "Aclaraciones",
        value: porcentajeAclaraciones,
        fill:
            porcentajeAclaraciones < 35
                ? "#10b981"
                : porcentajeAclaraciones < 70
                    ? "#f59e0b"
                    : "#ef4444",
    },
]

const financierasConMasReportes = [
    {
        nombre: "Coppel",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXc8MGGk2D_LdfCF0ToPNSBU_QxgqmprBIw&s"
    },
    {
        nombre: "Banco Azteca",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBTP2NeAiUfOx3awirohTifzBeQXI8bXQhQg&s"
    },
    {
        nombre: "BBVA",
        img: "https://images.seeklogo.com/logo-png/35/1/bbva-logo-png_seeklogo-352321.png"
    },
    {
        nombre: "Kueski",
        img: "https://logosandtypes.com/wp-content/uploads/2023/12/Kueski-Pay.png"
    },
    {
        nombre: "Creditea",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkzl8O-_aeDHM5eD0mMXsoZ9vqmOmadNKLTkMLtI2V_OxZ6_XVxV-Y3e4klv5ZWXihwiI&usqp=CAU"
    }
]


export default function InicioNomina() {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    const mejorFinanciera = financierasData.reduce((prev, current) => {
        const scorePrev = prev.positivos - prev.quejas
        const scoreCurrent = current.positivos - current.quejas
        return scoreCurrent > scorePrev ? current : prev
    })

    const totalOtorgados = prestamosData.reduce((acc, d) => acc + d.otorgados, 0)
    const currentData = hoverIndex !== null ? prestamosData[hoverIndex] : null
    const previousData = hoverIndex && hoverIndex > 0 ? prestamosData[hoverIndex - 1] : null

    const porcentajeCambio =
        currentData && previousData
            ? (((currentData.otorgados - previousData.otorgados) / previousData.otorgados) * 100).toFixed(2)
            : null

    return (
        <PageLayout>
            <div className="inicio-dashboard">
                {/* CARD MEJOR FINANCIERA */}
                <div className="podio-container">
                    <h3 className="podio-title">Top 3 Financieras del Mes</h3>
                    <div className="podio-linea"></div>
                    <div className="podio">
                        {top3Financieras.map((financiera, index) => (
                            <div key={financiera.name} className={`podio-item podio-${index + 1}`}>
                                {index === 0 && (
                                    <div className="podio-icon">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/2583/2583343.png"
                                            alt="Trofeo"
                                        />
                                    </div>
                                )}
                                <div className="podio-pos">#{index + 1}</div>
                                <div className="podio-nombre">{financiera.name}</div>
                                <div className="podio-score">Score: {financiera.positivos - financiera.quejas}</div>
                                <p className="podio-desc">
                                    {index === 0
                                        ? "Excelente desempeño"
                                        : index === 1
                                            ? "Buen posicionamiento"
                                            : "Sólida participación"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GRAFICO */}
                <div className="grafico-box">
                    <div className="grafico-header">
                        <p className="grafico-title">Total de Contratos</p>
                        <div className="switches">
                            <button className="active">Mes</button>
                            <button>Trimestre</button>
                            <button>Año</button>
                        </div>
                    </div>

                    <div className="monto-dinamico">
                        <span className="simbolo">N° </span>
                        <span className="monto-num">
                            {currentData ? currentData.otorgados.toLocaleString("es-MX") : totalOtorgados.toLocaleString("es-MX")}
                        </span>
                        {porcentajeCambio && (
                            <span
                                className={`porcentaje-cambio ${parseFloat(porcentajeCambio) >= 0 ? "positivo" : "negativo"}`}
                            >
                                {parseFloat(porcentajeCambio) >= 0 ? "▲" : "▼"} {Math.abs(parseFloat(porcentajeCambio)).toFixed(2)}%
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
                                        setHoverIndex(e.activeTooltipIndex)
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

                {/* EXPERIENCIA - MEDIDOR */}
                <div className="experiencia-box">
                    <h3 className="experiencia-title">Indicador de Aclaraciones</h3>

                    {/* Medidor semicircular segmentado */}
                    <div className="gauge-wrapper">
                        <RadialBarChart
                            cx="50%"
                            cy="55%"         // << bajamos un poco el centro
                            innerRadius="50%" // << más grueso
                            outerRadius="90%" // << controlado
                            startAngle={180}
                            endAngle={0}
                            width={240}
                            height={200}      // << menos alto que 220
                            data={aclaracionesPorMes}
                        >
                            <RadialBar background dataKey="valor" />
                        </RadialBarChart>

                        <div className="gauge-center">
                            <p className="gauge-value">29%</p>
                            <span className="gauge-desc">aclaraciones este mes</span>
                        </div>
                    </div>

                    {/* Avatares */}
                    <h4 className="subtitulo">Más reportadas</h4>
                    <div className="financieras-avatars">
                        {financierasConMasReportes.map((fin, idx) => (
                            <div key={idx} className="avatar-item" title={fin.nombre}>
                                <img src={fin.img} alt={fin.nombre} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="seccion-indicadores">
                    {/* Columna izquierda - Indicadores */}
                    <div className="bloque-indicadores">
                        <div className="indicadores-row">
                            {indicadoresGarantia.map((item, idx) => {
                                const porcentaje = ((item.valor / item.meta) * 100).toFixed(0)
                                const progresoColor = item.color
                                return (
                                    <div key={idx} className="indicador-card">
                                        <div className="card-header">
                                            <span className="icono">{item.icono}</span>
                                            <span className="titulo">{item.titulo}</span>
                                        </div>
                                        <p className="valor">{item.valor.toLocaleString()}</p>
                                        <div className="progreso-barra">
                                            <div
                                                className="progreso"
                                                style={{ width: `${porcentaje}%`, backgroundColor: progresoColor }}
                                            ></div>
                                        </div>
                                        <p className="progreso-texto">Meta {porcentaje}% alcanzada</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Columna derecha - Ranking financiero */}
                    <div className="bloque-ranking">
                        <h3 className="ranking-titulo">Ranking Financieras del Mes</h3>
                        {/* Aquí iría tu gráfica de barras horizontales o tabla */}
                        <RankingFinancierasMes />
                    </div>
                </div>


            </div>
        </PageLayout>
    )
}
