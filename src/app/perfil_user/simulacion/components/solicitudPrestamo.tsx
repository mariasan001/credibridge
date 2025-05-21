"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { SimType } from "../models/tipoSimulacionModel";
import { SimulationRequest, SimulationResult } from "../models/formularioSolicitud";
import { getSimTypes } from "../services/solicitarPrestamo";
import { simulateDiscount } from "../services/formularioSolicitud";
import "./formularioSolicitud.css";

export const SimuladorCreditoForm = () => {
  const { user } = useAuth();
  const [simTypes, setSimTypes] = useState<SimType[]>([]);
  const [selectedSimType, setSelectedSimType] = useState<number | "">("");
  const [periods, setPeriods] = useState<number>(12);
  const [paymentAmount, setPaymentAmount] = useState<number>(1000);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSimTypes()
      .then(setSimTypes)
      .catch(() => setSimTypes([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedSimType) return;

    const payload: SimulationRequest = {
      userId: user.userId,
      simTypeId: Number(selectedSimType),
      periods,
      paymentAmount,
    };

    setLoading(true);
    try {
      const data = await simulateDiscount(payload);
      setResults(data);
    } catch (err) {
      console.error("Error al simular:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getRangeBackground = (value: number, max: number) => {
    const percent = (value / max) * 100;
    return `linear-gradient(to right,rgb(79, 167, 47) 0%,rgb(35, 149, 64) ${percent}%, #ddd ${percent}%, #ddd 100%)`;
  };

  return (
    <div className="simulador-contenedor">
      <div className="simulador-card">
        <form className="simulador-form" onSubmit={handleSubmit}>
          <h2 className="simulador-title">Simulador de Crédito</h2>

          <label className="simulador-label">
            Tipo de Simulación
            <select
              value={selectedSimType}
              onChange={(e) => setSelectedSimType(Number(e.target.value))}
              required
            >
              <option value="">Selecciona una opción</option>
              {simTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name.toLowerCase().replace(/^./, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
          </label>

          <label className="simulador-label">
            Número de Quincenas
            <input
              type="range"
              value={periods}
              min={1}
              max={96}
              onChange={(e) => setPeriods(Number(e.target.value))}
              style={{ background: getRangeBackground(periods, 96) }}
            />
            <div className="simulador-monto-display">{periods} quincenas</div>
          </label>

          <label className="simulador-label">
            Monto del Abono Quincenal
            <input
              type="number"
              value={paymentAmount}
              min={1}
              step={0.01}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              required
            />
            <div className="simulador-monto-display">
              {paymentAmount.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </div>
          </label>

          <button className="simulador-button" type="submit" disabled={loading}>
            {loading ? "Simulando..." : "Simular"}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className=" simulador-form ">
          <h3 className="resultados-title">Resultados de tu simulación</h3>

        </div>
      )}
    </div>
  );
};
