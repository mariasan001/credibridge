"use client"

import { useEffect, useRef, useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import { FileDown } from "lucide-react"
import "./actualizacion.css"

const generarDatosActualizados = () => {
  const nombres = [
    "Rene Cortés", "Fanny Mojica", "Carlos Alcocer", "Ernestina Pineda", "Iván Zúñiga"
  ]
  const financieras = [
    "Kueski", "BBVA", "Creditea", "Banco Azteca", "Coppel"
  ]
  const movimientos = ["Nombre actualizado", "Monto corregido", "Fecha ajustada", "Descuento modificado"]

  return Array.from({ length: 50 }, (_, i) => ({
    id: `U${(i + 1).toString().padStart(3, "0")}`,
    nombre: nombres[Math.floor(Math.random() * nombres.length)],
    financiera: financieras[Math.floor(Math.random() * financieras.length)],
    cambio: movimientos[Math.floor(Math.random() * movimientos.length)],
    fecha: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString(),
    estado: Math.random() > 0.2 ? "Actualizado" : "Con error"
  }))
}

export default function ActualizacionPage() {
  const [archivoSubido, setArchivoSubido] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [actualizadosVisibles, setActualizadosVisibles] = useState<any[]>([])
  const scrollRef = useRef<HTMLTableRowElement>(null)
  const datosActualizados = useRef(generarDatosActualizados()).current

  useEffect(() => {
    if (archivoSubido && progreso < 100) {
      const interval = setInterval(() => {
        setProgreso(prev => {
          const next = prev + 25
          if (next >= 100) clearInterval(interval)
          return next
        })
      }, 500)
    }
  }, [archivoSubido])

  useEffect(() => {
    if (progreso === 100) {
      let index = 0
      const interval = setInterval(() => {
        setActualizadosVisibles(prev => {
          const next = datosActualizados[index]
          index++
          if (index >= datosActualizados.length) clearInterval(interval)
          return next ? [...prev, next] : prev
        })
      }, 150)
    }
  }, [progreso])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [actualizadosVisibles])

  return (
    <PageLayout>
      <div className="conciliacion-titulo">
        <h1>Simulador de Actualización de Datos</h1>
        <p>Sube el archivo y observa cómo se actualizan los registros de usuarios en el sistema</p>
      </div>

      <div className="upload-area" onClick={() => setArchivoSubido(true)}>
        <p>📤 Haz clic o arrastra tu archivo aquí</p>
        <p className="sub">Máx 5MB • .csv</p>
      </div>

      {archivoSubido && (
        <div className="analyzing-box">
          <p>Procesando archivo...</p>
          <div className="progress-bar">
            <div className="progress-inner" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      )}

      {actualizadosVisibles.length > 0 && (
        <div className="conciliacion-tabla-container">
          <h2 className="tabla-titulo">Registros Actualizados</h2>
          <div className="tabla-scrollable">
            <table className="conciliacion-tabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Financiera</th>
                  <th>Cambio</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {actualizadosVisibles.map((item, index) => (
                  <tr key={index} ref={index === actualizadosVisibles.length - 1 ? scrollRef : null}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.financiera}</td>
                    <td>{item.cambio}</td>
                    <td>{item.fecha}</td>
                    <td>
                      <span className={`badge ${item.estado === "Actualizado" ? "badge-conciliado" : "badge-error"}`}>
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="acciones-finales">
            <button className="boton-descarga">
              <FileDown size={16} />
              <span>Descargar log actualizado</span>
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
