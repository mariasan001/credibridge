"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import PayrollUploader from "./components/PayrollUploader";
import PayrollList from "./components/PayrollList";
import { CarteraHeader } from "./components/CarteraHeader";

export default function PayrollUploadPage() {
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const triggerReload = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <PageLayout>
      <CarteraHeader />
      <PayrollUploader onUploadSuccess={triggerReload} />
      <PayrollList reloadTrigger={reloadTrigger} />
    </PageLayout>
  );
}
