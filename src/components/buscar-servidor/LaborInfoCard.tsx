interface LaborInfoCardProps{
    unidadAdministrativa: string
    puesto: string
    estatus: string
    noEmpleado: string
    nomina: string
    institucion:string
    situacion:string
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
    fechaIngreso,
    
  }: LaborInfoCardProps) => {
    return (
      <div className="info-card">
        <h4 className="info-card__title">Información Laboral</h4>
        <div className="info-card__grid">
          <p><strong>Unidad:</strong> {unidadAdministrativa}</p>
          <p><strong>Puesto:</strong> {puesto}</p>
          <p><strong>Estatus:</strong> {estatus}</p>
          <p><strong>noEmpleado:</strong> {noEmpleado}</p>
          <p><strong>nomina:</strong> {nomina}</p>
          <p><strong>institucion:</strong> {institucion}</p>
          <p><strong>situacion:</strong> {situacion}</p>
          <p><strong>cuenta:</strong> {cuenta}</p>
          <p><strong>Ingreso:</strong> {fechaIngreso}</p>
         
        </div>
      </div>
    )
  }