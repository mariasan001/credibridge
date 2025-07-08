"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { QuejasAbiertasPorFinanciera } from "../../model/contractsDashboard.model";
import "../../InicioNomina.css";

interface Props {
  data: QuejasAbiertasPorFinanciera[];
}

const TOTAL_PERMITIDO = 50;

export default function IndicadorAclaraciones({ data }: Props) {
  const total = data.reduce((acc, curr) => acc + curr.quejasAbiertas, 0);
  const porcentaje = Math.min(Math.round((total / TOTAL_PERMITIDO) * 100), 100);

  const color =
    porcentaje < 40
      ? "#22c55e" // verde
      : porcentaje < 70
        ? "#facc15" // amarillo
        : "#ef4444"; // rojo

  const aclaracionesPorMes = [{ name: "Aclaraciones", value: porcentaje, fill: color }];

  return (
    <div className="indicador-box">
      <h3 className="indicador-title">Indicador de Aclaraciones</h3>

      {/* Gauge tipo velocímetro */}
      <div className="gauge-container">
        <RadialBarChart
          width={760}
          height={760}
          cx="50%"
          cy="70%"
          innerRadius="90%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
          barSize={20}
          data={aclaracionesPorMes}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />

        </RadialBarChart>

        <div className="gauge-value-container">
          <h2>{porcentaje}%</h2>
          <p>aclaraciones este mes</p>
        </div>

        <div className="gauge-limits">
          <span>0</span>
          <span>100</span>
        </div>
      </div>

      {/* Avatares */}
      <h4 className="subtitulo">Más reportadas</h4>
      <div className="financieras-avatars">
        {data
          .sort((a, b) => b.quejasAbiertas - a.quejasAbiertas)
          .slice(0, 5)
          .map((fin, idx) => (
            <div
              key={idx}
              className="avatar-item"
              title={`${fin.financiera} - ${fin.quejasAbiertas} quejas`}
            >
              <span className="avatar-iniciales">
                {fin.financiera
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .substring(0, 3)
                  .toUpperCase()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
