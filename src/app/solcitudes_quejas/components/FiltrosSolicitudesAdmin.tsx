"use client"

import { useEffect, useState } from "react"
import { Ticket } from "../model/ticket.model"
import "./FiltrosSolicitudesAdmin.css"
import { Building2, BadgeHelp, CalendarDays, Layers3 } from "lucide-react"

interface Props {
  tickets: Ticket[]
  onChange: (filtros: {
    tipo: string
    estatus: string
    financiera: string
    tiempo: string
  }) => void
}

export default function FiltrosSolicitudesAdmin({ tickets, onChange }: Props) {
  const [tipo, setTipo] = useState("TODOS")
  const [estatus, setEstatus] = useState("TODOS")
  const [financiera, setFinanciera] = useState("TODAS")
  const [tiempo, setTiempo] = useState("TODO")

  const financierasUnicas = Array.from(new Set(tickets.map(t => t.lenderName)))

  useEffect(() => {
    onChange({ tipo, estatus, financiera, tiempo })
  }, [tipo, estatus, financiera, tiempo])

  return (
    <div className="filtros-admin">
      <div className="filtro-item">
        <label>Tipo</label>
        <div className="filtro-box">
          <BadgeHelp className="filtro-icon" size={16} />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="TODOS">Todos</option>
            <option value="SOLICITUD">Solicitud</option>
            <option value="QUEJA">Queja</option>
          </select>
        </div>
      </div>

      <div className="filtro-item">
        <label>Estatus</label>
        <div className="filtro-box">
          <Layers3 className="filtro-icon" size={16} />
          <select value={estatus} onChange={(e) => setEstatus(e.target.value)}>
            <option value="TODOS">Todos</option>
            <option value="ABIERTO">Abierto</option>
            <option value="EN PROCESO">En proceso</option>
            <option value="RESUELTO">Resuelto</option>
          </select>
        </div>
      </div>

      <div className="filtro-item">
        <label>Financiera</label>
        <div className="filtro-box">
          <Building2 className="filtro-icon" size={16} />
          <select value={financiera} onChange={(e) => setFinanciera(e.target.value)}>
            <option value="TODAS">Todas</option>
            {financierasUnicas.map(nombre => (
              <option key={nombre} value={nombre}>{nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filtro-item">
        <label>Tiempo</label>
        <div className="filtro-box">
          <CalendarDays className="filtro-icon" size={16} />
          <select value={tiempo} onChange={(e) => setTiempo(e.target.value)}>
            <option value="TODO">Todo el tiempo</option>
            <option value="MES">Último mes</option>
            <option value="3MESES">Últimos 3 meses</option>
            <option value="AÑO">Último año</option>
          </select>
        </div>
      </div>
    </div>
  )
}
