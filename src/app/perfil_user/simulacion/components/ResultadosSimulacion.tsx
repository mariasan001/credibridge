"use client";

import { SimulationResult } from "../models/formularioSolicitud";
import "./ResultadosSimulacion.css";
import { CheckCircle } from "lucide-react";

interface ResultadosSimulacionProps {
  results: SimulationResult[];
  seleccionado: SimulationResult | null;
  onSeleccionar: (item: SimulationResult) => void;
}

export const ResultadosSimulacion = ({
  results,
  seleccionado,
  onSeleccionar,
}: ResultadosSimulacionProps) => {
  if (results.length === 0) return null;

  // Determina la mejor opción (la de menor tasa anual)
  const mejorOpcionId = results.reduce((minId, current) =>
    current.effectiveAnnualRate <
    results.find((r) => r.lenderServiceId === minId)!.effectiveAnnualRate
      ? current.lenderServiceId
      : minId,
    results[0].lenderServiceId
  );

  return (
    <div className="simulador-resultados1">
      <h3 className="resultados-titulo">Resultados de tu simulación</h3>

      {results.map((res) => {
        const esMejorOpcion = res.lenderServiceId === mejorOpcionId;
        const estaSeleccionado = seleccionado?.lenderServiceId === res.lenderServiceId;

        return (
          <div
            key={res.lenderServiceId}
            className={`resultado-card 
              ${esMejorOpcion ? "mejor-opcion" : "opcion-secundaria"} 
              ${estaSeleccionado ? "seleccionado" : ""}`}
            onClick={() => onSeleccionar(res)}
          >
            <div className="resultado-header">
              {esMejorOpcion && (
                <span className="resultado-icono">
                  <CheckCircle size={18} strokeWidth={2.5} color="#2ecc71" />
                </span>
              )}
              {res.lenderName}
            </div>

            <div className="resultado-grid">
              <div className="resultado-columna">
                <span className="etiqueta">Capital total</span>
                <strong className="valor">${res.capital.toFixed(2)}</strong>
              </div>
              <div className="resultado-columna">
                <span className="etiqueta">Tasa anual</span>
                <strong className="valor">{res.effectiveAnnualRate}%</strong>
              </div>
              <div className="resultado-columna">
                <span className="etiqueta">Tasa por periodo</span>
                <strong className="valor">{res.effectivePeriodRate}%</strong>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
