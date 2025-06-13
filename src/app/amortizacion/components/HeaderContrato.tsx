import { Download } from "lucide-react"
import "./HeaderContrato.css"

export function HeaderContrato() {
  return (
    <div className="cartera-header">
      <div className="cartera-header__info">
        <h2>Tabla de Amortización</h2>
        <p>Aqui podras ver el desglose Historico de tu usario serleccionado </p>
      </div>
      <button className="cartera-header__btn">
        <Download size={16} />
        Opciones de Descarga
      </button>
    </div>
  )
}
