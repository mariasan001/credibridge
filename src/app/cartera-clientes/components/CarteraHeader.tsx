import { Download } from "lucide-react"
import "./CarteraHeader.css"

export function CarteraHeader() {
  return (
    <div className="cartera-header">
      <div className="cartera-header__info">
        <h2>Cartera de clientes</h2>
        <p>Ingresa los datos correspondientes para poder obtener la información correspondiente</p>
      </div>
      <button className="cartera-header__btn">
        <Download size={16} />
        Opciones de Descarga
      </button>
    </div>
  )
}
