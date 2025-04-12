interface PersonalInfoCardProps {
    nombre: string
    genero: string
    fechaNacimiento:string
    rfc: string
    curp: string
    telefono?: string
    correo?: string
    estadoCivil?:string
    madre?:string
    padre?:string
  }
  
  export const PersonalInfoCard = ({
    nombre,
    genero,
    fechaNacimiento,
    rfc,
    curp,
    telefono,
    correo,
    estadoCivil,
    madre,
    padre
  }: PersonalInfoCardProps) => {
    return (
      <div className="info-card">
        <h4 className="info-card__title">Información Personal</h4>
        <div className="info-card__grid">
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Genero:</strong>{genero}</p>
          <p><strong>Fecha de Nacimiento:</strong>{fechaNacimiento}</p>
          <p><strong>Estado Civil:</strong>{estadoCivil}</p>
          <p><strong>Madre:</strong>{madre}</p>
          <p><strong>Padre:</strong>{padre}</p>
          <p><strong>RFC:</strong> {rfc}</p>
          <p><strong>CURP:</strong> {curp}</p>
          {telefono && <p><strong>Teléfono:</strong> {telefono}</p>}
          {correo && <p><strong>Correo:</strong> {correo}</p>}
        </div>
      </div>
    )
  }