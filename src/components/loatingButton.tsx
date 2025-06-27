// FloatingButton.tsx
"use client";
import "./FloatingButton.css";

interface FloatingButtonProps {
  onClick: () => void;
  reportCount: number;
}

export const FloatingButton = ({ onClick, reportCount }: FloatingButtonProps) => {
  return (
    <button className="floating-button" onClick={onClick}>
      📝 Generar Reporte
      {reportCount > 0 && <span className="report-count">{reportCount}</span>}
    </button>
  );
};
