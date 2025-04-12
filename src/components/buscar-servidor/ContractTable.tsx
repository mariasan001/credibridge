"use client"

interface Contract {
  servicio: string
  institucion: string
  contrato: string
  codigoInstitucion: string
  fecha: string
}

interface ContractTableProps {
  data: Contract[]
}

export const ContractTable = ({ data }: ContractTableProps) => {
  return (
    <div className="contract-table">
      <table>
        <thead> 
          <tr>
            <th>Servicio</th>
            <th>Institucion</th>
            <th>Contrato</th>
            <th>Codigo Institucion</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={5} className="contract-table__empty">No hay registros disponibles.</td>
            </tr>
          ) : ( 
            data.map((item) => (
              <tr key={item.servicio}>
                <td>{item.institucion}</td>
                <td>{item.contrato}</td>
                <td>{item.codigoInstitucion}</td>
                <td>{item.fecha}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
