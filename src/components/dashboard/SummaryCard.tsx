// components/dashboard/SummaryCard.tsx
"use client"
interface SummaryCardProps {
  title: string
  value: number
}

export const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <div className="summary-card">
      <h3 className="summary-card__value">{value}</h3>
      <p className="summary-card__title">{title}</p>
    </div>
  )
}
