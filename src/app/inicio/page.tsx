"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

// Layout principal
import { PageLayout } from "@/components/PageLayout"

// Componentes de dashboard
import { SummaryCard } from "@/components/dashboard/SummaryCard"
import { RankingChart } from "@/components/dashboard/RankingChart"
import { NewsCard } from "@/components/dashboard/NewsCard"

// Skeleton para carga inicial
import { InicioSkeleton } from "@/components/theme/InicioSkeleton"
import 'react-loading-skeleton/dist/skeleton.css' 

export default function InicioPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ Primero espera a que AuthContext termine de cargar
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/user/inicar-sesion")
      } else {
        // Si está autenticado, inicia la simulación de carga visual
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [authLoading, isAuthenticated, router])

  // Mientras no se resuelve auth, no mostramos nada (opcional puedes poner Skeleton aquí)
  if (authLoading) {
    return <div>Cargando sesión...</div>
  }

  return (
    <PageLayout>
      {loading ? (
        // === Vista de carga ===
        <InicioSkeleton />
      ) : (
        // === Vista real del dashboard ===
        <div className="dashboard-container">
          {/* === Encabezado principal === */}
          <div className="dashboard-main">
            <div className="dashboard-header">
              <h2>Bienvenido 👋</h2>
              <p>Aquí podrás observar el comportamiento de las dependencias.</p>
            </div>

            {/* === Tarjetas resumen === */}
            <div className="summary-cards-container">
              <SummaryCard title="Total de incidencias" value={123} />
              <SummaryCard title="Expiradas" value={25} />
              <SummaryCard title="Activas" value={20} />
              <SummaryCard title="Atendidas" value={100} />
            </div>

            {/* === Gráfico de ranking === */}
            <RankingChart />
          </div>

          {/* === Noticias recientes === */}
          <aside className="dashboard-news">
            <h3 className="news-title">¡Últimas Noticias!</h3>

            <NewsCard
              entidad="Total CREDI"
              estado="comunicado"
              date="11/03/2025"
              title="Administradores y gestores de nómina"
              subtitle="Verifiquen que los datos de los colaboradores estén actualizados."
              highlights={[
                "🔸 Altas de seguro: Dentro de los primeros 5 días hábiles.",
                "⚠️ Bajas: Reportarlas de inmediato para evitar cargos extra.",
                "📩 Dudas o aclaraciones: [correo@ejemplo.com]"
              ]}
            />
            <NewsCard
              entidad="Total CREDI"
              estado="comunicado"
              date="11/03/2025"
              title="Administradores y gestores de nómina"
              subtitle="Verifiquen que los datos de los colaboradores estén actualizados."
              highlights={[
                "🔸 Altas de seguro: Dentro de los primeros 5 días hábiles.",
                "⚠️ Bajas: Reportarlas de inmediato para evitar cargos extra.",
                "📩 Dudas o aclaraciones: [correo@ejemplo.com]"
              ]}
            />
          </aside>
        </div>
      )}
    </PageLayout>
  )
}
