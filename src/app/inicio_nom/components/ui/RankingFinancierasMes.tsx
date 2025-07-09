"use client";

import "../../InicioNomina.css";
import { ContractsDashboardResponse } from "../../model/contractsDashboard.model";
import "../../InicioNomina.css"; // Asegúrate que los estilos están ahí o enlázalos donde corresponda

interface Props {
  data: ContractsDashboardResponse;
}

export default function RankingFinancierasMess({ data }: Props) {
  // Unificar la información de préstamos y quejas
  const financierasUnificadas = data.prestamosPorFinanciera.map((prestamo) => {
    const quejas = data.quejasAbiertasPorFinanciera.find(
      (q) => q.financiera === prestamo.financiera
    )?.quejasAbiertas || 0;

    return {
      name: prestamo.financiera,
      score: prestamo.cantidadPrestamo - quejas,
      prestamos: prestamo.cantidadPrestamo,
      quejas,
    };
  });

  const top3Financieras = [...financierasUnificadas]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
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
            <div className="podio-score">
              Contratos: {financiera.score}
            </div>
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
  );
}
