import React from "react";
import DebtPurchaseList from "./components/debt-purchase/DebtPurchaseList";
import { PageLayout } from "@/components/PageLayout";
import { CarteraHeader } from "./components/CarteraHeader";

const DebtPage = () => {
  return (
    <PageLayout>
      <CarteraHeader></CarteraHeader>
      <DebtPurchaseList />
    </PageLayout>
  );
};

export default DebtPage;

