import { PageLayout } from "@/components/PageLayout";
import { ContractsList } from "./components/ContractsList";
import { CarteraHeader } from "./components/CarteraHeader";

export default function ProspectosPage() {
  return (
    <PageLayout>
      <CarteraHeader />
      <ContractsList />
    </PageLayout>
  );
}

