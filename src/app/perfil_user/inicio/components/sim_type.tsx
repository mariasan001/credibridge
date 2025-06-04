// 📁 TipoSimulacionSelect.tsx
"use client";

import { useEffect, useState } from "react";
import { SimType } from "../model/simType";
import { getSimTypes } from "../services/sim_type_service";
import "./TipoSimulacionSelect.css";

export const TipoSimulacionSelect = () => {
  const [simTypes, setSimTypes] = useState<SimType[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSimTypes()
      .then(setSimTypes)
      .catch(() => setSimTypes([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="tipo-simulacion-container">
      <label htmlFor="tipo-simulacion" className="tipo-simulacion-label">
        Tipo de Simulación
      </label>

      {loading ? (
        <p className="tipo-simulacion-loading">Cargando opciones...</p>
      ) : (
        <select
          id="tipo-simulacion"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="tipo-simulacion-select"
        >
          <option value="">Selecciona un tipo</option>
          {simTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      )}

      {selectedId !== "" && (
        <p className="tipo-simulacion-resultado">
          Seleccionaste: {simTypes.find((t) => t.id === selectedId)?.name}
        </p>
      )}
    </div>
  );
};
