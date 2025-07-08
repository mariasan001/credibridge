"use client";

import { RadialBarChart, RadialBar } from "recharts";
import { QuejasAbiertasPorFinanciera } from "../../model/contractsDashboard.model";
import "../../InicioNomina.css"; // Asegúrate que los estilos están ahí o enlázalos donde corresponda

interface Props {
  data: QuejasAbiertasPorFinanciera[];
}

const TOTAL_PERMITIDO = 50;

export default function IndicadorAclaraciones({ data }: Props) {
  const total = data.reduce((acc, curr) => acc + curr.quejasAbiertas, 0);
  const porcentaje = Math.min(Math.round((total / TOTAL_PERMITIDO) * 100), 100);

  const aclaracionesPorMes = [{ name: "Aclaraciones", valor: porcentaje }];

  return (
    <div className="experiencia-box">
      <h3 className="experiencia-title">Indicador de Aclaraciones</h3>

      {/* Medidor semicircular */}
      <div className="gauge-wrapper">
        <RadialBarChart
          cx="50%"
          cy="55%"
          innerRadius="50%"
          outerRadius="90%"
          startAngle={180}
          endAngle={0}
          width={240}
          height={200}
          data={aclaracionesPorMes}
        >
          <RadialBar
            background
            dataKey="valor"
            cornerRadius={10}
            fill="#F97316"
          />
        </RadialBarChart>

        <div className="gauge-center">
          <p className="gauge-value">{porcentaje}%</p>
          <span className="gauge-desc">aclaraciones este mes</span>
        </div>
      </div>

      {/* Avatares dinámicos */}
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
                  .map(p => p[0])
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
