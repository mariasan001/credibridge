"use client";

import { useState, useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { SimType } from "../model/simType";
import { SimulationRequest, SimulationResult } from "../model/discount_limit_controller";
import { getSimTypes } from "../services/sim_type_service";
import { simulateDiscount } from "../services/simulacion_credit";

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

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Simulador de Crédito</h2>

      <label>
        Tipo de Simulación
        <select
          value={selectedSimType}
          onChange={(e) => setSelectedSimType(Number(e.target.value))}
          required
        >
          <option value="">Selecciona una opción</option>
          {simTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </label>

      <label>
        Número de Periodos (meses)
        <input
          type="number"
          value={periods}
          min={1}
          onChange={(e) => setPeriods(Number(e.target.value))}
          required
        />
      </label>

      <label>
        Monto del Abono Mensual
        <input
          type="number"
          value={paymentAmount}
          min={1}
          step={0.01}
          onChange={(e) => setPaymentAmount(Number(e.target.value))}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Simulando..." : "Simular"}
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3>Resultados:</h3>
          <ul>
            {results.map((res) => (
              <li key={res.lenderServiceId}>
                <strong>{res.lenderName}</strong> - Capital: ${res.capital.toFixed(2)} - Tasa Anual: {res.effectiveAnnualRate}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};
