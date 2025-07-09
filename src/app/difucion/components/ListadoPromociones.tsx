"use client"

import { useState } from "react"
import { Promotion } from "../model/promotion_model_todas"
import { PromocionCard } from "./PromocionCard"
import { calcularEstado } from "../utils/estadoPromocion"
import "./ListadoPromociones.css"

type Estado = "Todos" | "Activo" | "Próximo" | "Inactivo"
const filtros: Estado[] = ["Todos", "Activo", "Próximo", "Inactivo"]

interface Props {
  promociones: Promotion[]
  onEdit?: (promocion: Promotion) => void
  onDelete?: (id: number) => void
}

export function ListadoPromociones({ promociones, onEdit, onDelete }: Props) {
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<Estado>("Todos")

  const filtrar = (estado: Estado) =>
    estado === "Todos"
      ? promociones
      : promociones.filter(p => calcularEstado(p.startDate, p.endDate) === estado)

  return (
    <div className="promociones">
      <h2 className="promociones-titulo">Promociones registradas</h2>

      <div className="promociones-tabs">
        {filtros.map(f => (
          <button
            key={f}
            className={`promocion-tab ${filtroSeleccionado === f ? "activo" : ""}`}
            onClick={() => setFiltroSeleccionado(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtrar(filtroSeleccionado).length === 0 ? (
        <div className="empty-state-solicitudes">
          <img
            src="/img/sin_promociones.png"
            alt="Sin solicitudes"
            className="empty-solicitudes-img"
          />
          <h2>"Aún no has creado ninguna promoción activa"</h2>
          <p>
            Las promociones que publiques aquí estarán visibles para los servidores públicos.
          </p>
          <p className="motivador">
            Crea tu primera promoción y empieza a destacar tus servicios.
          </p>
        </div>
      ) : (
        <ul className="promociones-lista">
          {filtrar(filtroSeleccionado).map(p => (
            <PromocionCard
              key={p.id}
              promocion={p}
              onEdit={() => onEdit?.(p)}      // ✅ pasamos el objeto completo
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
