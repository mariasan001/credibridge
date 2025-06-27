import { PageLayout } from "@/components/PageLayout";
import { PeriodForm } from "./components/PeriodForm";
import { PeriodList } from "./components/PeriodList";
import "./periodos.css"; // Asegúrate de crear este archivo
import { CarteraHeader } from "./components/CarteraHeader";

export default function PeriodosPage() {
  return (
    <PageLayout>
      <CarteraHeader/>
      <div className="periodos-contenedor">
        <div className="formulario">
          <PeriodForm />
        </div>
        <div className="lista">
          <PeriodList />
        </div>
      </div>
    </PageLayout>
  );
}
