"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { PageLayout } from "@/components/PageLayout"
import "./CrearPromocionPage.css"

import { Promotion } from "./model/promotion_model_todas"
import { obtenerPromociones } from "./services/promocion_service_todas"
import { eliminarPromocion } from "./services/promo_services_delate"
import { ListadoPromociones } from "./components/ListadoPromociones"
import { FormularioPromocion } from "./components/FormularioPromocion"

export default function CrearPromocionPage() {
  const { user, loading } = useAuth()
  const lender = user?.lender

  const [promociones, setPromociones] = useState<Promotion[]>([])
  const [promocionEditando, setPromocionEditando] = useState<Promotion | null>(null)

  useEffect(() => {
    if (!loading && lender) {
      obtenerPromociones().then(setPromociones)
    }
  }, [loading, lender])

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

  const handleEdit = (promocion: Promotion) => {
    setPromocionEditando(promocion)
  }

  const recargarPromociones = async () => {
    const nuevas = await obtenerPromociones()
    setPromociones(nuevas)
    setPromocionEditando(null)
  }

  if (loading) return null // o un loader

  if (!lender) {
    return (
      <PageLayout>
        <div className="error-message">
          ⚠️ No tienes una financiera asignada. Contacta al administrador.
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="crear-promocion-grid">
        <ListadoPromociones
          promociones={promociones}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <FormularioPromocion
          lenderId={lender.id}
          lenderName={lender.lenderName}
          promocionEditando={promocionEditando}
          onActualizarExito={recargarPromociones}
        />
      </div>
    </PageLayout>
  )
}
