"use client"

interface Contract {
  servicio: string
  institucion: string
  contrato: string
  codigoInstitucion: string
  fecha: string
  icon?: string
}

interface ContractTableProps {
  data: Contract[]
}

export const ContractTable = ({ data }: ContractTableProps) => {
  return (
    <div className="contract-table-wrapper">
      {/* Título de la tabla */}
      <h4 className="contract-table__title">Historial de Contratos Terminados</h4>

      {/* Contenedor de la tabla */}
      <div className="contract-table">
        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Nombre de la Institución</th>
              <th>Contrato</th>
              <th>Cod inst.</th>
              <th>Fecha</th>
            </tr>
          </thead>

          <tbody>
            {/* Si no hay datos */}
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="contract-table__empty">
                  No hay registros disponibles.
                </td>
              </tr>
            ) : (
              // Si hay datos, renderizar cada fila
              data.map((item, index) => (
                <tr key={index}>
                  {/* Servicio tipo badge */}
                  <td>
                    <span className="contract-service">{item.servicio}</span>
                  </td>

                  {/* Institución con ícono */}
                  <td>
                    <div className="institution-info">
                      <div className="institution-icon">{item.icon}</div>
                      <span>{item.institucion}</span>
                    </div>
                  </td>

                  <td>{item.contrato}</td>

                  {/* Código de institución con color secundario */}
                  <td style={{ color: "#64748b", fontWeight: 600 }}>
                    {item.codigoInstitucion}
                  </td>

                  <td>{item.fecha}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
