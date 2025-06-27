import { CarteraHeader } from "@/app/admin_prin_nom/components/CarteraHeader";
import { PageLayout } from "@/components/PageLayout";
import { ReportsTable } from "./components/PeriodList";

export default function ReportesPage() {
  return (
    <PageLayout>
      <CarteraHeader/>
     <ReportsTable></ReportsTable>
    </PageLayout>
  );
}
