import { Download } from "lucide-react"
import "./TiketHeader.css"

export function CarteraHeader() {
  return (
    <div className="cartera-header">
      <div className="cartera-header__info">
        <h2>Historial de Solicitudes </h2>
        <p>Podras Observar todo el listado de todas las solicitudes realizados por el servidor</p>
      </div>
      <button className="cartera-header__btn">
        <Download size={16} />
        Opciones de Descarga
      </button>
    </div>
  )
}
