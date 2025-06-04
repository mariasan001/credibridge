"use client";

import { useEffect, useState } from "react";
import { Promotion } from "../model/Promotion";
import { getActivePromotions } from "../services/promotionService";
import { BadgePercent, Heart } from "lucide-react";
import "./PromocionesActivasList.css";

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
    <div className="promos-container">
      <h2 className="promos-title">Promociones Activas</h2>

      {loading ? (
        <p className="promos-loading">Cargando promociones...</p>
      ) : promotions.length === 0 ? (
        <p className="promos-empty">No hay promociones activas disponibles.</p>
      ) : (
        <div className="promos-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promo-card-clean">
              <div className="promo-card-header">
                <div className="promo-card-icon">
                  <BadgePercent size={24} strokeWidth={2} color="#FEA600" />
                </div>
                <h3 className="promo-card-title">
                  {promo.promotionTitle} ✨
                </h3>
              </div>

              <p className="promo-card-desc">
                En <strong>{promo.lender.lenderName}</strong>, {promo.promotionDesc}
              </p>

              <ul className="promo-card-benefits">
                {promo.benefits.map((b) => (
                  <li key={b.id}>✅ {b.benefitsDesc}</li>
                ))}
              </ul>

              <div className="promo-card-footer">
                <span className="promo-card-expira">
                  Expira el{" "}
                  {new Date(promo.endDate).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>

                <button className="promo-card-btn">
                  <Heart size={16} />
                  Lo quiero
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
