
import { PageLayout } from "@/components/PageLayout";
import { ReportsTable } from "./components/PeriodList";
import { CarteraHeader } from "./components/CarteraHeader";

export default function ReportesPage() {
  return (
    <PageLayout>
      <CarteraHeader/>
      
     <ReportsTable></ReportsTable>
    </PageLayout>
  );
}
