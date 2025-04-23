"use client"

import { PageLayout } from "@/components/PageLayout"
import { TabsPortal } from "./components/TabsPortal"
import { ListadoPublicaciones } from "./components/ListadoPublicaciones"
import { FormularioPublicacion } from "./components/FormularioPublicacion"
import "./portal-comunicacion.css"

export default function PortalComunicacionPage() {
  return (
    <PageLayout>
      <div className="portal-comunicacion-wrapper">
        <h1 className="portal-comunicacion__titulo">Portal de Comunicación</h1>
        <p className="portal-comunicacion__subtitulo">
          Publicaciones recientes, avisos importantes y recordatorios.
        </p>

        {/* Tabs para secciones */}
        <TabsPortal />

        {/* Sección principal: publicaciones + formulario */}
        <div className="portal-comunicacion__contenido">
          <div className="portal-comunicacion__publicaciones">
            <ListadoPublicaciones />
          </div>
          <div className="portal-comunicacion__formulario">
            <FormularioPublicacion />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
