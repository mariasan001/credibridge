"use client";

import { useEffect, useState } from "react";import { useAuth } from "@/context/AuthContext";
import { getUserDiscountLimit } from "../services/limite_service";

export const LimiteCreditoCard = () => {
  const { user } = useAuth();
  const [limite, setLimite] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getUserDiscountLimit(user.userId)
      .then((data) => setLimite(data))
      .catch((err) => {
        console.error("Error:", err);
        setLimite(null);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div>
      <h3>Límite de descuento</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : limite !== null ? (
        <p>${limite.toLocaleString()}</p>
      ) : (
        <p>No disponible</p>
      )}
    </div>
  );
};
