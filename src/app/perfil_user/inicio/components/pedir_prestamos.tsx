"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { SimulationResult } from "../model/discount_limit_controller";
import { PromotionCreate } from "../model/PromotionCreate";
import { createPromotion } from "../services/finpromotionService";

interface CrearPromocionFormProps {
  simulacion: SimulationResult;
  simTypeId: number;
  periods: number;
  paymentAmount: number;
  capital: number;
}

export const CrearPromocionForm = ({
  simulacion,
  simTypeId,
  periods,
  paymentAmount,
  capital,
}: CrearPromocionFormProps) => {
  const { user } = useAuth();
  const [telefono, setTelefono] = useState(user?.phone ?? "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const start = new Date().toISOString();
    const end = new Date();
    end.setMonth(end.getMonth() + periods);

    const payload: PromotionCreate = {
      promotionTitle: "Solicitud de Préstamo",
      promotionDesc: `Simulación tipo ${simTypeId} por ${periods} meses con abono de $${paymentAmount}`,
      startDate: start,
      endDate: end.toISOString(),
      webIcon: "https://via.placeholder.com/40x40",
      mobileIcon: "https://via.placeholder.com/40x40",
      lenderServiceId: simulacion.lenderServiceId,
      lenderId: simulacion.lenderId,
      benefits: [
        {
          id: 1,
          benefitsDesc: `Monto autorizado: $${capital.toFixed(2)} con tasa ${simulacion.effectiveAnnualRate}%`,
        },
      ],
    };

    setLoading(true);
    try {
      await createPromotion(payload);
      setSuccess(true);
    } catch (err) {
      console.error("Error al crear promoción:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 500 }}>
      <h3>Finalizar Solicitud de Préstamo</h3>

      <label>
        Teléfono de contacto
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Confirmar Préstamo"}
      </button>

      {success && <p style={{ color: "green" }}>Solicitud enviada correctamente ✅</p>}
    </form>
  );
};