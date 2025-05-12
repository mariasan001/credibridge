"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { PageLayout } from "@/components/PageLayout"
import "./CrearPromocionPage.css"

import { Promotion } from "./model/promotion_model_todas"
import { obtenerPromociones } from "./services/promocion_service_todas"
import { ListadoPromociones } from "./components/ListadoPromociones"
import { FormularioPromocion } from "./components/FormularioPromocion"
import { eliminarPromocion } from "./services/promo_services_delate"

export default function CrearPromocionPage() {
  const { user } = useAuth()

  if (!user || !user.lender) {
    return (
      <PageLayout>
        <div className="error-message">
          ⚠️ No tienes una financiera asignada. Contacta al administrador.
        </div>
      </PageLayout>
    )
  }

  const lender = user.lender
  const [promociones, setPromociones] = useState<Promotion[]>([])

  useEffect(() => {
    obtenerPromociones().then(setPromociones)
  }, [])

  const handleDelete = async (id: number) => {
    const confirmar = confirm("¿Seguro que quieres eliminar esta promoción?")
    if (!confirmar) return

    try {
      await eliminarPromocion(id)
      setPromociones(prev => prev.filter(p => p.id !== id))
      alert("Promoción eliminada correctamente.")
    } catch (error) {
      console.error("❌ Error al eliminar promoción", error)
      alert("Ocurrió un error al eliminar la promoción.")
    }
  }

  return (
    <PageLayout>
      <div className="crear-promocion-grid">
        <ListadoPromociones promociones={promociones} onDelete={handleDelete} />
        <FormularioPromocion lenderId={lender.id} lenderName={lender.lenderName} />
      </div>
    </PageLayout>
  )
}
