"use client";

import { PageLayout } from "@/components/PageLayout";
import { uploadCatalogFile, uploadPayrollFile } from "./service/uploadService";
import styles from "./UploadFilesPage.module.css";
import { CarteraHeader } from "./components/CarteraHeader";
import AdvancedUploadBox from "./components/UploadBox";

export default function UploadFilesPage() {
  const handleUploadPayroll = async (file: File): Promise<void> => {
    await uploadPayrollFile(file);
    // La alerta se lanza dentro de AdvancedUploadBox
  };

  const handleUploadCatalog = async (file: File): Promise<void> => {
    await uploadCatalogFile(file);
    // La alerta se lanza dentro de AdvancedUploadBox
  };

  return (
    <PageLayout>
      <CarteraHeader />
      <div className={styles.container}>
        <div className={styles.uploadRow}>
          <AdvancedUploadBox
            heading="Para nómina"
            description=""
            imageSrc="/img/subir_archivo1.png"
            onUpload={handleUploadPayroll}
          />

          <AdvancedUploadBox
            heading="Para catálogo"
            description=""
            imageSrc="/img/subir_archivo1.png"
            onUpload={handleUploadCatalog}
          />
        </div>
      </div>
    </PageLayout>
  );
}
