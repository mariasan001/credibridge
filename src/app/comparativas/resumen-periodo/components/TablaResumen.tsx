"use client"

import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { ArrowDown, ArrowUp } from "lucide-react"
import "./TablaResumen.css"

interface DatoResumen {
  periodo: string
  institucion: string
  modalidad: string
  concepto: string
  estatus: string
  cuotas: number
  interes: number
  contratos: number
  valor: number
  valorQuincenal: number
  saldoDeudor: number
  valorQuin: number
  altas: number
  valorAltasQuincenal: number
  valor1P: number
  valorTotal: number
  valorTasa: number
  contratosTotales: number
  totalValorQuincenal: number
  totalSaldo: number
}

type ColumnaKey = keyof DatoResumen

const mockData: DatoResumen[] = [...Array(20)].map((_, i) => ({
  periodo: "202304",
  institucion: `Institución ${i + 1}`,
  modalidad: i % 2 === 0 ? "prestamo" : "seguro",
  concepto: "5525",
  estatus: i % 3 === 0 ? "inactivo" : "activo",
  cuotas: 0,
  interes: 0.0,
  contratos: 1000 + i,
  valor: 0.0,
  valorQuincenal: 1000,
  saldoDeudor: 0.0,
  valorQuin: 338089.0,
  altas: 34,
  valorAltasQuincenal: 12021.0,
  valor1P: 0.0,
  valorTotal: 0.0,
  valorTasa: 0.0,
  contratosTotales: 1142,
  totalValorQuincenal: 12010.0,
  totalSaldo: 0.0,
}))

const columnas: { key: ColumnaKey; label: string }[] = [
  { key: "periodo", label: "Periodo" },
  { key: "institucion", label: "Nombre de la Institución" },
  { key: "concepto", label: "Concepto" },
  { key: "modalidad", label: "Modalidad" },
  { key: "estatus", label: "Estatus" },
  { key: "cuotas", label: "Cuotas" },
  { key: "interes", label: "Tasa de interés" },
  { key: "contratos", label: "Cantidad de contratos" },
  { key: "valor", label: "Valor total" },
  { key: "saldoDeudor", label: "Saldo Deudor" },
  { key: "valorQuin", label: "Valor Quin" },
  { key: "altas", label: "Altas" },
  { key: "valorAltasQuincenal", label: "valor de Altas Quincenal" },
  { key: "valor1P", label: "Valor 1P total" },
  { key: "valorTotal", label: "Valor Total Altas" },
  { key: "valorTasa", label: "Valor Tasa" },
  { key: "contratosTotales", label: "Contra Totales" },
  { key: "totalValorQuincenal", label: "Total Valor Quincenal" },
  { key: "totalSaldo", label: "Total Saldo por Quincenal" },
]

export const TablaResumen = () => {
  const [loading, setLoading] = useState(true)
  const [ordenColumna, setOrdenColumna] = useState<ColumnaKey>("periodo")
  const [ascendente, setAscendente] = useState(true)
  const [pagina, setPagina] = useState(1)
  const filasPorPagina = 8

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timeout)
  }, [])

  const ordenar = (a: DatoResumen, b: DatoResumen) => {
    const valA = a[ordenColumna]
    const valB = b[ordenColumna]
    if (valA < valB) return ascendente ? -1 : 1
    if (valA > valB) return ascendente ? 1 : -1
    return 0
  }

  const datosFiltrados = mockData.sort(ordenar)
  const totalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina)
  const datos = datosFiltrados.slice((pagina - 1) * filasPorPagina, pagina * filasPorPagina)

  const cambiarOrden = (key: ColumnaKey) => {
    if (ordenColumna === key) {
      setAscendente(!ascendente)
    } else {
      setOrdenColumna(key)
      setAscendente(true)
    }
  }

  return (
    <div className="tabla-resumen">
      <div className="tabla-resumen__scroll">
        <table>
          <thead>
            <tr>
              {columnas.map((col, index) => (
                <th
                  key={col.key}
                  onClick={() => cambiarOrden(col.key)}
                  style={{ textAlign: index <= 2 ? "left" : "center" }}
                >
                  <span className="tabla-resumen__th-content">
                    {col.label}
                    {ordenColumna === col.key && (
                      ascendente ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(filasPorPagina)].map((_, i) => (
                <tr key={i}>
                  {columnas.map((col, index) => (
                    <td key={col.key} style={{ textAlign: index <= 2 ? "left" : "center" }}>
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              datos.map((item, i) => (
                <tr key={i}>
                  {columnas.map((col, index) => {
                    const valor = item[col.key]
                    return (
                      <td key={col.key} style={{ textAlign: index <= 2 ? "left" : "center" }}>
                        {col.key === "estatus" ? (
                          <span className={`badge badge-${valor}`}>
                            <span
                              className="status-dot"
                              style={{ backgroundColor: valor === "activo" ? "var(--color-status-activo-text)" : "#C2C2C2" }}
                            ></span>
                            {valor}
                          </span>
                        ) : col.key === "modalidad" ? (
                          <span className={`badge badge-${valor}`}>{valor}</span>
                        ) : (
                          valor
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && (
        <div className="tabla-resumen__paginacion">
          <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}>
            ← Anterior
          </button>
          <span>Página {pagina} de {totalPaginas}</span>
          <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}>
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}
