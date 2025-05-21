// perfecto trabjaremos con este componte ya trae la infomracion que necesito justo es el formulairio patra la solicitud de cresito pero 
// quiero hacer algo y no se si se pueda

"use client";

import { useEffect, useState } from "react";
import { SimType } from "../model/simType";
import { getSimTypes } from "../services/sim_type_service";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label htmlFor="tipo-simulacion" style={{ fontWeight: 600 }}>
        Tipo de Simulación
      </label>

      {loading ? (
        <p style={{ fontSize: 14 }}>Cargando opciones...</p>
      ) : (
        <select
          id="tipo-simulacion"
          value={selectedId}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
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
        <p style={{ fontSize: 13, color: "#555" }}>
          Seleccionaste: {simTypes.find((t) => t.id === selectedId)?.name}
        </p>
      )}
    </div>
  );
};
