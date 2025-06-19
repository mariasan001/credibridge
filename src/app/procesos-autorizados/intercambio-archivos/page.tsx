"use client"

import { useEffect, useRef, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import { FileDown } from "lucide-react"
import "./conciliacion.css"

const generarDatosConciliados = () => {
  const estados = ["Conciliado", "Faltante en sistema B", "Faltante en sistema A"]
  return Array.from({ length: 60 }, (_, i) => {
    const id = `T${(i + 1).toString().padStart(3, "0")}`
    const estado = estados[Math.floor(Math.random() * estados.length)]
    const comentario =
      estado === "Conciliado" ? "OK" : estado === "Faltante en sistema A" ? "No encontrado en A" : "No encontrado en B"
    return { id, estado, comentario }
  })
}

export default function ConciliacionPage() {
  const [archivoSubido, setArchivoSubido] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [conciliadosVisibles, setConciliadosVisibles] = useState<any[]>([])
  const scrollRef = useRef<HTMLTableRowElement>(null)

  const datosConciliados = useRef(generarDatosConciliados()).current

  // Simula análisis del archivo
  useEffect(() => {
    if (archivoSubido && progreso < 100) {
      const interval = setInterval(() => {
        setProgreso(prev => {
          const next = prev + 20
          if (next >= 100) clearInterval(interval)
          return next
        })
      }, 500)
    }
  }, [archivoSubido])

  // Simula entrada uno a uno en la tabla
  useEffect(() => {
    if (progreso === 100) {
      let index = 0
      const interval = setInterval(() => {
        setConciliadosVisibles(prev => {
          const next = datosConciliados[index]
          index++
          if (index >= datosConciliados.length) clearInterval(interval)
          return next ? [...prev, next] : prev
        })
      }, 200)
    }
  }, [progreso])

  // Scroll automático al último
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [conciliadosVisibles])

  return (
    <PageLayout>
      <div className="conciliacion-titulo">
        <h1>Simulador de Conciliación</h1>
        <p>Sube el archivo con los descuentos y simula su conciliación contra las financieras</p>
      </div>

      <div className="upload-area" onClick={() => setArchivoSubido(true)}>
        <p>📁 Haz clic o arrastra tu archivo CSV aquí</p>
        <p className="sub">Máximo 5MB • Formato .csv</p>
      </div>

      {archivoSubido && (
        <div className="analyzing-box">
          <p>Analizando archivo...</p>
          <div className="progress-bar">
            <div className="progress-inner" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      )}

      {conciliadosVisibles.length > 0 && (
<div className="conciliacion-tabla-container">
  <h2 className="tabla-titulo">Resultado de Conciliación</h2>
  <div className="tabla-scrollable">
    <table className="conciliacion-tabla">
      <thead>
        <tr>
          <th>ID Transacción</th>
          <th>Estado</th>
          <th>Comentario</th>
        </tr>
      </thead>
      <tbody>
        {conciliadosVisibles.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>
              <span className={`badge ${item.estado === "Conciliado" ? "badge-conciliado" : "badge-error"}`}>
                {item.estado}
              </span>
            </td>
            <td>{item.comentario}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="acciones-finales">
    <button className="boton-descarga">
      <FileDown size={16} />
      <span>Descargar resultado CSV</span>
    </button>
  </div>
</div>

      )}
    </PageLayout>
  )
}
