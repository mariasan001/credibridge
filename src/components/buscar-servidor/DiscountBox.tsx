"use client"

interface DiscountBoxProps {
  descuento: string
}

export const DiscountBox = ({ descuento }: DiscountBoxProps) => {
  return (
    <div className="discount-box">
      {/* Valor principal del descuento */}
      <span className="discount-box__value">{descuento}</span>

      {/* Etiqueta secundaria */}
      <span className="discount-box__label">Descuento disponible</span>
    </div>
  )
}
