import { PageLayout } from "@/components/PageLayout";
import { LimiteCreditoCard } from "./components/limit_componet";
import { TipoSimulacionSelect } from "./components/sim_type";
import { SimuladorCreditoForm } from "./components/descount_limit_contrac";
import { PromocionesActivasList } from "./components/list_promocines";

export default function LimitePage() {
  return (
    <PageLayout>
      <LimiteCreditoCard />
      <h1>Simulación de Crédito</h1>
      <TipoSimulacionSelect />
      <SimuladorCreditoForm />
      <PromocionesActivasList />
       </PageLayout>
        
  );
}
