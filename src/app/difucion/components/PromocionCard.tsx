"use client"

import { CalendarDays, Landmark, Pencil, ShieldCheck, Trash2 } from "lucide-react"
import { Promotion } from "../model/promotion_model_todas"
import { calcularEstado } from "../utils/estadoPromocion"

interface Props {
  promocion: Promotion
  onEdit?: (promocion: Promotion) => void
  onDelete?: (id: number) => void
}

export function PromocionCard({ promocion: p, onEdit, onDelete }: Props) {
  const estado = calcularEstado(p.startDate, p.endDate)

  const handleDelete = () => {
    if (confirm("¿Estás seguro de eliminar esta promoción?")) {
      onDelete?.(p.id)
    }
  }

  return (
    <li className="promocion-card">
      {/* Header */}
      <div className="promocion-header">
        <div className="promocion-avatar">
          <ShieldCheck size={20} />
        </div>

        <div className="promocion-header-contenido">
          <div className="promocion-header-top">
            <h3 className="promocion-titulo">{p.promotionTitle}</h3>
            <div className="promocion-actions">
              <button onClick={() => onEdit?.(p)}><Pencil size={16} /></button>
              <button onClick={handleDelete}><Trash2 size={16} /></button>
            </div>
          </div>
          <span className="promocion-financiera">
            <Landmark size={14} /> {p.lender.lenderName}
          </span>
        </div>
      </div>

      {/* Descripción */}
      <p className="promocion-desc">{p.promotionDesc}</p>

      {/* Beneficios */}
      {p.benefits.length > 0 && (
        <ul className="promocion-beneficios">
  {p.benefits.map((b, i) => (
    <li key={`${p.id}-${i}`}>{b.benefitsDesc}</li>
  ))}
</ul>

      )}

      {/* Footer */}
      <div className="promocion-footer">
        <span className={`promocion-estado ${estado.toLowerCase()}`}>{estado}</span>
        <span className="promocion-vigencia">
          <CalendarDays size={14} /> {new Date(p.startDate).toLocaleDateString()} - {new Date(p.endDate).toLocaleDateString()}
        </span>
      </div>
    </li>
  )
}
