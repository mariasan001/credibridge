import "./DiscountLimitBox.css"

interface Props {
  limit: number
}

export function DiscountLimitBox({ limit }: Props) {
  const formatted = `$${Math.round(limit).toLocaleString("es-MX")}`

  return (
    <div className="discount-box">
      <span className="amount">{formatted}</span>
      <span className="subtitle">descuento disponible</span>
    </div>
  )
}
