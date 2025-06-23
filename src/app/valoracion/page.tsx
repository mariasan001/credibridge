"use client"

import { PageLayout } from "@/components/PageLayout"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
} from "recharts"
import "./ValoracionFinanciera.css"

const valoracionesEstrellas = [
    { estrellas: "5 ⭐", cantidad: 220 },
    { estrellas: "4 ⭐", cantidad: 140 },
    { estrellas: "3 ⭐", cantidad: 80 },
    { estrellas: "2 ⭐", cantidad: 40 },
    { estrellas: "1 ⭐", cantidad: 20 },
]

const indicadores = [
    { titulo: "Tiempo de respuesta", valor: 78, color: "#10b981", icono: "⏱️" },
    { titulo: "Atención al cliente", valor: 82, color: "#3b82f6", icono: "🙋" },
    { titulo: "Resolución efectiva", valor: 65, color: "#f59e0b", icono: "✅" },
    { titulo: "Recomendación", valor: 72, color: "#8b5cf6", icono: "👍" },
]

const opiniones = [
    { cliente: "Juan Pérez", comentario: "Muy buena atención y rápida respuesta." },
    { cliente: "Laura Gómez", comentario: "Tardaron en resolver mi problema, pero fueron amables." },
    { cliente: "Carlos Ruiz", comentario: "Todo excelente, volvería a solicitar un préstamo." },
    { cliente: "Ana Martínez", comentario: "Podrían mejorar los tiempos de resolución." },
]

export default function ValoracionFinancieraPage() {
    return (
        <PageLayout>
            <div className="valoracion-container">

                {/* Encabezado */}
                <header className="valoracion-header">
                    <h2>Evaluación de la Financiera</h2>
                    <p>Opiniones y calificaciones de los clientes</p>
                </header>

                {/* Distribución de calificaciones + Promedio */}
                <div className="bloque-graficas">
                    <div className="tarjeta grafico-estrellas">
                        <h3>Distribución de Calificaciones</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={valoracionesEstrellas} barGap={4}>
                                <XAxis type="number" axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="estrellas" axisLine={false} tick={{ fontSize: 13, fill: "#6b7280" }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#fff", borderRadius: 8, border: "1px solid #e5e7eb" }}
                                    formatter={(value: number) => [`${value} votos`, "Calificaciones"]}
                                />
                                <Bar dataKey="cantidad" radius={[8, 8, 8, 8]} fill="#fb923c" background={{ fill: "#f3f4f6" }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

 <div className="grafico-promedio">
  <h3>Promedio General</h3>

  <div className="radial-wrapper">
    <RadialBarChart
      width={160}
      height={120}
      cx="50%"
      cy="100%"
      innerRadius="80%"
      outerRadius="100%"
      barSize={12}
      startAngle={180}
      endAngle={0}
      data={[
        { name: "Base", value: 100, fill: "#e5e7eb" },
        { name: "Promedio", value: 82, fill: "#10b981" },
      ]}
    >
      <RadialBar dataKey="value" cornerRadius={8} />
    </RadialBarChart>
  </div>

  <div className="promedio-label">
    <span className="score">4.1</span>
    <span className="slash">/ 5</span>
    <p className="nota">Promedio basado en 500 valoraciones</p>
  </div>
</div>

                </div>

                {/* Indicadores clave */}
                <div className="bloque-indicadores">
                    <h3>Indicadores Clave de Servicio</h3>
                    <div className="indicadores-grid">
                        {indicadores.map((item, idx) => (
                            <div key={idx} className="indicador-card">
                                <div className="indicador-header">
                                    <span className="icono">{item.icono}</span>
                                    <span>{item.titulo}</span>
                                </div>
                                <div className="barra-externa">
                                    <div className="barra-interna" style={{ width: `${item.valor}%`, backgroundColor: item.color }}></div>
                                </div>
                                <p className="porcentaje">{item.valor}% satisfacción</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Opiniones de clientes */}
                <div className="bloque-opiniones">
                    <h3>Comentarios de los Clientes</h3>
                    <ul className="lista-opiniones">
                        {opiniones.map((op, idx) => (
                            <li key={idx} className="opinion-item">
                                <strong>{op.cliente}:</strong> {op.comentario}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </PageLayout>
    )
}
