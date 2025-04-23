"use client"

import { PublicacionCard, PublicacionCardProps } from "./PublicacionCard"
import "./ListadoPublicaciones.css"

const publicacionesMock: PublicacionCardProps[] = [
  {
    tipo: "comunicado",
    titulo: "Actualización del sistema",
    emitidoPor: "Dirección de TI",
    descripcion: "El sistema será actualizado este fin de semana.",
    fechaPublicacion: "2025-04-22",
    fechaExpiracion: "2025-04-25",
   
    archivos: [
      {
        nombre: "manual-actualizacion.pdf",
        tipo: "pdf",
        url: "/archivos/manual-actualizacion.pdf" 
      }
    ],
  },
  
  {
    tipo: "importante",
    titulo: "Nueva Política Interna",
    emitidoPor: "Recursos Humanos",
    descripcion: "Revisa los documentos actualizados de la política de seguridad.",
    fechaPublicacion: "2025-04-22",
    fechaExpiracion: "2025-05-01",
   
    archivos: [
      {
        nombre: "politica-seguridad.pdf",
        tipo: "pdf",
        url: "/archivos/politica-seguridad.pdf"
      },
      {
        nombre: "formato-informe.docx",
        tipo: "word",
        url: "/archivos/formato-informe.docx"
      },
      {
        nombre: "ejemplo-imagen.jpg",
        tipo: "imagen",
        url: "/archivos/ejemplo-imagen.jpg"
      }
    ]
  },
  
  {
    tipo: "recordatorio",
    titulo: "Entrega de informes",
    emitidoPor: "Coordinación Administrativa",
    descripcion: "Tienes hasta el viernes para entregar el reporte mensual.",
    fechaPublicacion: "2025-04-21",
    fechaExpiracion: "2025-04-26",
    archivos: [
      {
        nombre: "manual-actualizacion.pdf",
        tipo: "pdf",
        url: "/archivos/manual-actualizacion.pdf" 
        
      }
    ],
  },
]

export const ListadoPublicaciones = () => {
  return (
    <div className="listado-publicaciones">
      {publicacionesMock.map((publi, idx) => (
        <PublicacionCard key={idx} {...publi} />
      ))}
    </div>
  )
}
