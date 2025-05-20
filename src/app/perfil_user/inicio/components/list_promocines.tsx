"use client";

import { useEffect, useState } from "react";
import { Promotion } from "../model/Promotion";
import { getActivePromotions } from "../services/promotionService";

export const PromocionesActivasList = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivePromotions()
      .then(setPromotions)
      .catch(() => setPromotions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Promociones Activas</h2>

      {loading ? (
        <p>Cargando promociones...</p>
      ) : promotions.length === 0 ? (
        <p>No hay promociones activas disponibles.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {promotions.map((promo) => (
            <div
              key={promo.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "16px",
                background: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
              }}
            >
              <h3>{promo.lender.lenderName}</h3>
              <p><strong>Descripción:</strong> {promo.lender.lenderDesc}</p>
              <p><strong>Teléfono:</strong> {promo.lender.lenderPhone}</p>
              <p><strong>Correo:</strong> {promo.lender.lenderEmail}</p>

              <h4>Beneficios:</h4>
              <ul>
                {promo.benefits.map((b) => (
                  <li key={b.id}>{b.benefitsDesc}</li>
                ))}
              </ul>

              <p><strong>Máximo Descuento:</strong> {promo.maxValue * 100}%</p>
              <p>
                <strong>Monto Mínimo:</strong>{" "}
                {promo.minimumAmountPerContract !== undefined
                    ? `$${promo.minimumAmountPerContract.toFixed(2)}`
                    : "No especificado"}
                </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
