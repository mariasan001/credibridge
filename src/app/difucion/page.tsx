"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"; // ✅ Zustand version
import { PageLayout } from "@/components/PageLayout";
import "./CrearPromocionPage.css";

import { Promotion } from "./model/promotion_model_todas";
import { obtenerPromociones } from "./services/promocion_service_todas";
import { eliminarPromocion } from "./services/promo_services_delate";
import { ListadoPromociones } from "./components/ListadoPromociones";
import { FormularioPromocion } from "./components/FormularioPromocion";

export default function CrearPromocionPage() {
  const { user, loading } = useAuth();
  const lender = user?.lender;

  const [promociones, setPromociones] = useState<Promotion[]>([]);
  const [promocionEditando, setPromocionEditando] = useState<Promotion | null>(null);

  // 🧠 Cargar promociones al montar
  useEffect(() => {
    if (!loading && lender) {
      obtenerPromociones()
        .then(setPromociones)
        .catch((error) => {
          console.error("❌ Error al obtener promociones", error);
        });
    }
  }, [loading, lender]);

  // 🗑️ Eliminar promoción
  const handleDelete = async (id: number) => {
    const confirmar = confirm("¿Seguro que quieres eliminar esta promoción?");
    if (!confirmar) return;

    try {
      await eliminarPromocion(id);
      setPromociones((prev) => prev.filter((p) => p.id !== id));
      alert("✅ Promoción eliminada correctamente.");
    } catch (error) {
      console.error("❌ Error al eliminar promoción", error);
      alert("Ocurrió un error al eliminar la promoción.");
    }
  };

  // ✏️ Editar
  const handleEdit = (promocion: Promotion) => {
    setPromocionEditando(promocion);
  };

  // 🔄 Recargar lista después de crear/editar
  const recargarPromociones = async () => {
    try {
      const nuevas = await obtenerPromociones();
      setPromociones(nuevas);
      setPromocionEditando(null);
    } catch (error) {
      console.error("❌ Error al recargar promociones", error);
    }
  };

  if (loading) return <p className="text-center mt-8">⏳ Cargando...</p>;

  if (!user) {
    return (
      <PageLayout>
        <div className="error-message">
          ⚠️ No se ha encontrado el usuario. Intenta iniciar sesión de nuevo.
        </div>
      </PageLayout>
    );
  }

  if (!lender) {
    return (
      <PageLayout>
        <div className="error-message">
          ⚠️ No tienes una financiera asignada. Contacta al administrador.
        </div>
      </PageLayout>
    );
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
  );
}
