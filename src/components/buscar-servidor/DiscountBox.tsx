"use client"

interface DiscountBoxProps {
  descuento: string
}

export const DiscountBox = ({ descuento }: DiscountBoxProps) => {
  return (
    <div className="discount-box">
      <span className="discount-box__label">Descuento disponible</span>
      <span className="discount-box__value">{descuento}</span>
    </div>
  )
}