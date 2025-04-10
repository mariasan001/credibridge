import { PageLayout } from "@/components/PageLayout"
import { SummaryCard } from "@/components/dashboard/SummaryCard"
import { RankingChart } from "@/components/dashboard/RankingChart"
import { NewsCard } from "@/components/dashboard/NewsCard"

export default function InicioPage() {
  return (
    <PageLayout>
      <div className="dashboard-container">
        <div className="dashboard-main">
          <div className="dashboard-header">
            <h2>Bienvenido 👋</h2>
            <p>Aquí podrás observar el comportamiento de las dependencias.</p>
          </div>

          <div className="summary-cards-container">
            <SummaryCard title="Total de incidencias" value={123} />
            <SummaryCard title="Expiradas" value={25} />
            <SummaryCard title="Activas" value={20} />
            <SummaryCard title="Atendidadd" value={100} />
          </div>

          <RankingChart />
        </div>

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
    </PageLayout>
  )
}
