import { Download } from "lucide-react"
import "./CarteraHeader.css"

export function ResumenHeader() {
  return (
    <div className="cartera-header">
      <div className="cartera-header__info">
        <h2>Resumen de Perido</h2>
        <p>Aqui podras encotrar los datos correpodentes de cada pedido </p>
      </div>
      <button className="cartera-header__btn">
        <Download size={16} />
        Opciones de Descarga
      </button>
    </div>
  )
}
