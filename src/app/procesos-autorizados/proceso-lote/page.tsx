"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import UploadBox from "./components/UploadBox";
import { uploadCatalogFile, uploadPayrollFile } from "./service/uploadService";
import { getUserAudit, getCatalogAudit } from "./service/auditService";
import styles from "./UploadFilesPage.module.css";
import { CarteraHeader } from "./components/CarteraHeader";

export default function UploadFilesPage() {
  const [userLogs, setUserLogs] = useState([]);
  const [catalogLogs, setCatalogLogs] = useState([]);

  const handleUploadPayroll = async (file: File): Promise<void> => {
    await uploadPayrollFile(file);
    const logs = await getUserAudit();
    setUserLogs(logs);
  };

  const handleUploadCatalog = async (file: File): Promise<void> => {
    await uploadCatalogFile(file);
    const logs = await getCatalogAudit();
    setCatalogLogs(logs);
  };

  return (
    <PageLayout>
      <CarteraHeader/>
      <div className={styles.container}>
        <h1 className={styles.heading}></h1>

        <div className={styles.uploadRow}>
          <UploadBox title="Subir archivo de nómina" onUpload={handleUploadPayroll} />
          <UploadBox title="Subir archivo de catálogo" onUpload={handleUploadCatalog} />
        </div>

        {userLogs.length > 0 && (
          <div className={styles.auditBox}>
            <h2 className={styles.auditTitle}>Auditoría de Usuario</h2>
            <ul className={styles.auditList}>
              {userLogs.map((log: any) => (
                <li key={log.id}>
                  [{new Date(log.auditTimestamp).toLocaleString()}] {log.userId} - {log.operation}
                </li>
              ))}
            </ul>
          </div>
        )}

        {catalogLogs.length > 0 && (
          <div className={styles.auditBox}>
            <h2 className={styles.auditTitle}>Auditoría de Catálogo</h2>
            <ul className={styles.auditList}>
              {catalogLogs.map((log: any) => (
                <li key={log.id}>
                  [{new Date(log.changedAt).toLocaleString()}] {log.operation} en {log.tableName} (ID: {log.recordId})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
