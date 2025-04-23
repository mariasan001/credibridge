"use client"

import {
  AlertCircle,
  Info,
  Bell,
  FileText,
  File,
  Image
} from "lucide-react"

import "./PublicacionCard.css"
import React, { ReactElement } from "react"

export interface PublicacionCardProps {
  tipo: "comunicado" | "importante" | "recordatorio"
  titulo: string
  descripcion: string
  fechaPublicacion: string
  fechaExpiracion: string
  emitidoPor?: string
  archivos?: {
    nombre: string
    tipo: "pdf" | "word" | "excel" | "imagen"
    url: string
  }[]
}

export const PublicacionCard = ({
  tipo,
  titulo,
  descripcion,
  fechaPublicacion,
  fechaExpiracion,
  emitidoPor,
  archivos,
}: PublicacionCardProps) => {
  const iconos: Record<"comunicado" | "importante" | "recordatorio", ReactElement> = {
    comunicado: <Info size={16} />,
    importante: <AlertCircle size={16} />,
    recordatorio: <Bell size={16} />,
  }

  const iconoArchivo = (tipo: string) => {
    switch (tipo) {
      case "pdf":
        return <FileText size={16} />
      case "word":
        return <File size={16} />
      case "excel":
        return <File size={16} />
      case "imagen":
        return <Image size={16} />
      default:
        return <File size={16} />
    }
  }

  return (
    <div className={`publicacion-card tipo-${tipo}`}>
      <div className="publicacion-card__top">
        <span className="publicacion-card__tag">
          {iconos[tipo]} {tipo}
        </span>
        <span className="publicacion-card__fecha">
          Publicado: {fechaPublicacion}
        </span>
      </div>

      <h3 className="publicacion-card__titulo">{titulo}</h3>
      <p className="publicacion-card__descripcion">{descripcion}</p>

      {emitidoPor && (
        <p className="publicacion-card__emitido">
          Emitido por: <strong>{emitidoPor}</strong>
        </p>
      )}

      {archivos && archivos.length > 0 && (
        <div className="publicacion-card__archivos">
          {archivos.map((archivo, i) => (
            <a
              key={i}
              className="publicacion-card__archivo"
              href={archivo.url}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              {iconoArchivo(archivo.tipo)}
              <span>{archivo.nombre}</span>
            </a>
          ))}
        </div>
      )}

      <div className="publicacion-card__footer">
        <span className="publicacion-card__expira">
          Expira: {fechaExpiracion}
        </span>
      </div>

      {/* ✅ Franja inferior visual */}
      <div className="publicacion-card__barra" />
    </div>
  )
}
