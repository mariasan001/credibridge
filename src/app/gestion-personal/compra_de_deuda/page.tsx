import React from "react";
import DebtPurchaseList from "./components/debt-purchase/DebtPurchaseList";
import { PageLayout } from "@/components/PageLayout";

const DebtPage = () => {
  return (
    <PageLayout>
      <DebtPurchaseList />
    </PageLayout>
  );
};

export default DebtPage;

