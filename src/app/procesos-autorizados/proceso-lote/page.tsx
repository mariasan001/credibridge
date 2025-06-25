"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import UploadBox from "./components/UploadBox";
import { uploadCatalogFile, uploadPayrollFile } from "./service/uploadService";
import { getUserAudit, getCatalogAudit } from "./service/auditService";

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
      <div className="max-w-2xl mx-auto space-y-6 p-6">
        <h1 className="text-xl font-bold">Subir archivos .dbf</h1>

        <UploadBox title="Subir archivo de nómina" onUpload={handleUploadPayroll} />

        {userLogs.length > 0 && (
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold">Auditoría de Usuario</h2>
            <ul className="text-sm">
              {userLogs.map((log: any) => (
                <li key={log.id}>
                  [{new Date(log.auditTimestamp).toLocaleString()}] {log.userId} - {log.operation}
                </li>
              ))}
            </ul>
          </div>
        )}

        <UploadBox title="Subir archivo de catálogo" onUpload={handleUploadCatalog} />

        {catalogLogs.length > 0 && (
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold">Auditoría de Catálogo</h2>
            <ul className="text-sm">
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
