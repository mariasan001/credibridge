import { PageLayout } from "@/components/PageLayout";
import { PeriodForm } from "./components/PeriodForm";
import { PeriodList } from "./components/PeriodList";

export default function PeriodosPage() {
  return (
    <PageLayout>
      <h1>Gestión de Periodos</h1>
      <PeriodForm />
      <hr />
      <PeriodList />
      
    </PageLayout>
  );
}
