"use client";

import React, { useMemo } from "react";
import "./DiscountLimitBox.css";

interface Props {
  limit: number;
}

export const DiscountLimitBox = React.memo(function DiscountLimitBox({ limit }: Props) {
  const formatted = useMemo(() => {
    const safeValue = isNaN(limit) ? 0 : limit;
    return `$${Math.round(safeValue).toLocaleString("es-MX")}`;
  }, [limit]);

  return (
    <div className="discount-box">
      <span className="amount">{formatted}</span>
      <span className="subtitle">descuento disponible</span>
    </div>
  );
});
