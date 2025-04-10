"use client"

interface NewsCardProps {
  entidad: string
  estado: "comunicado" | "importante"
  date: string
  title: string
  subtitle: string
  highlights: string[]
}

export const NewsCard = ({
  entidad,
  estado,
  date,
  title,
  subtitle,
  highlights
}: NewsCardProps) => {
  return (
    <div className="news-card">
      <div className="news-card__top">
        <span className="news-card__entidad">{entidad}</span>
        <span className="news-card__date">{date}</span>
      </div>

      <span className={`news-card__estado ${estado}`}>{estado}</span>

      <h3 className="news-card__title">{title}</h3>
      <p className="news-card__subtitle">{subtitle}</p>

      <ul className="news-card__list">
        {highlights.map((text, i) => (
          <li key={i} className="news-card__item">{text}</li>
        ))}
      </ul>
    </div>
  )
}
