"use client";
import "./FloatingButton.css";

export const FloatingButton = ({ onClick }: { onClick: () => void }) => (
  <button className="floating-button" onClick={onClick}>
    📝 Generar Reporte
  </button>
);
