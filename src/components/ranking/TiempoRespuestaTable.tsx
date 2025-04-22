"use client"

import "./respuesta.css"

const mockData = [
  {
    dias: 1,
    institucion: "Administradora de Caja Bienestar SA de CV",
    solicitudes: 10,
    expedidas: 10,
    activas: 10,
    total: 30,
  },
  {
    dias: 5,
    institucion: "ASF servicios Financieros SAPI de CV",
    solicitudes: 30,
    expedidas: 30,
    activas: 30,
    total: 90,
  },
  {
    dias: 5,
    institucion: "ASF servicios Financieros SAPI de CV",
    solicitudes: 30,
    expedidas: 30,
    activas: 30,
    total: 90,
  },
  {
    dias: 5,
    institucion: "ASF servicios Financieros SAPI de CV",
    solicitudes: 30,
    expedidas: 30,
    activas: 30,
    total: 90,
  },
  {
    dias: 10,
    institucion: "Asociacion Necrologico Mexicana",
    solicitudes: 11,
    expedidas: 11,
    activas: 11,
    total: 33,
  },
  {
    dias: 10,
    institucion: "Asociacion Necrologico Mexicana",
    solicitudes: 11,
    expedidas: 11,
    activas: 11,
    total: 33,
  },
  {
    dias: 10,
    institucion: "Asociacion Necrologico Mexicana",
    solicitudes: 11,
    expedidas: 11,
    activas: 11,
    total: 33,
  },
  {
    dias: 10,
    institucion: "Asociacion Necrologico Mexicana",
    solicitudes: 11,
    expedidas: 11,
    activas: 11,
    total: 33,
  },
]

// 🔥 Función que asigna la clase según el número de días
const getBadgeClass = (dias: number) => {
  if (dias <= 3) return "badge-success"
  if (dias <= 7) return "badge-warning"
  return "badge-danger"
}

export const TiempoRespuestaTable = () => {
  return (
    <div className="respuesta-card">
      <div className="respuesta-header">
        <h3>Tiempo de Respuesta</h3>
        <button className="respuesta-btn-pdf">Descargar pdf</button>
      </div>

      <table className="respuesta-table">
        <thead>
          <tr>
            <th>Tiempo de Respuesta ⬇</th>
            <th>Institución</th>
            <th>Solicitudes</th>
            <th>Expedidas</th>
            <th>Activas</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item, idx) => (
            <tr key={idx}>
              <td>
                <span className={`badge ${getBadgeClass(item.dias)}`}>
                  {item.dias} {item.dias === 1 ? "día" : "días"}
                </span>
              </td>
              <td>{item.institucion}</td>
              <td>{item.solicitudes}</td>
              <td>{item.expedidas}</td>
              <td>{item.activas}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="respuesta-pagination">
        <button className="respuesta-btn">← Regresar</button>
        <div className="respuesta-pages">
          {[1, 2, 3, "...", 8, 9, 10].map((p, i) => (
            <button
              key={i}
              className={`respuesta-page ${p === 1 ? "active" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="respuesta-btn">Siguiente →</button>
      </div>
    </div>
  )
}
