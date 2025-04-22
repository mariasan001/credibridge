"use client"

interface LaborInfoCardProps {
  unidadAdministrativa: string
  puesto: string
  estatus: string
  noEmpleado: string
  nomina: string
  institucion: string
  situacion: string
  cuenta: string
  fechaIngreso: string
}

export const LaborInfoCard = ({
  unidadAdministrativa,
  puesto,
  estatus,
  noEmpleado,
  nomina,
  institucion,
  situacion,
  cuenta,
  fechaIngreso
}: LaborInfoCardProps) => {
  // Determina si la situación es "Activo" para aplicar estilos
  const esActivo = situacion.toLowerCase() === "activo"

  return (
    <div className="info-card info-card--laboral">
      {/* Título de la tarjeta */}
      <h4 className="info-card__title">Información Laboral</h4>

      {/* Contenedor de datos en formato grid */}
      <div className="info-card__grid">
        <p><span>Unidad:</span> <strong>{unidadAdministrativa}</strong></p>
        <p><span>Puesto:</span> <strong className="text-blue">{puesto}</strong></p>
        <p><span>Estatus:</span> <strong>{estatus}</strong></p>
        <p><span>No. Empleado:</span> <strong>{noEmpleado}</strong></p>
        <p><span>Nómina:</span> <strong>{nomina}</strong></p>
        <p><span>Institución:</span> <strong>{institucion}</strong></p>
        <p>
          <span>Situación:</span>{" "}
          <strong className={esActivo ? "text-success" : "text-danger"}>
            {situacion}
          </strong>
        </p>
        <p><span>Cuenta:</span> <strong>{cuenta}</strong></p>
        <p><span>Ingreso:</span> <strong>{fechaIngreso}</strong></p>
      </div>
    </div>
  )
}
