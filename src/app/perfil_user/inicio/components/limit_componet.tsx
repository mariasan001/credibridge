"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserDiscountLimit } from "../services/limite_service";
import {
  Banknote,
  BarChart2,
  FolderOpenDot,
} from "lucide-react";
import "./LimiteCreditoCard.css";

export const LimiteCreditoCard = () => {
  const { user } = useAuth();
  const [limite, setLimite] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getUserDiscountLimit(user.userId)
      .then((data) => setLimite(data))
      .catch(() => setLimite(null))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="limite-ui-card">
      <h2 className="limite-ui-title">Total de descuento disponible</h2>

      <div className="limite-ui-monto">
        {loading ? (
          <span className="limite-ui-loading">Cargando...</span>
        ) : limite !== null ? (
          <span className="limite-ui-valor">${limite.toLocaleString()}</span>
        ) : (
          <span className="limite-ui-error">No disponible</span>
        )}
      </div>

      <p className="limite-ui-descripcion">
        Se muestra el monto que puede descontarse de tu nómina.
      </p>

      <div className="limite-ui-opciones">
        <div className="limite-ui-opcion">
          <BarChart2 size={20} />
          <span>Consultar</span>
        </div>
        <div className="limite-ui-opcion">
          <FolderOpenDot size={20} />
          <span>Movimientos</span>
        </div>
        <div className="limite-ui-opcion">
          <Banknote size={20} />
          <span>Directorio</span>
        </div>
      </div>
    </div>
  );
};
