// components/buttons/DownloadButton.tsx
"use client"

interface Props{
    label? :string
}
export const DownloadButton = ({ label = "Descargar" }: Props) => {
    return (
      <button className="download-btn">
        <span>⬇</span> {label}
      </button>
    )
  }