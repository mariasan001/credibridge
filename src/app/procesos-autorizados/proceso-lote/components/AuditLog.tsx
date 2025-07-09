"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./AuditLog.module.css"; // Asegúrate que sí es .module.css
import { CatalogAudit } from "../model/auditTypes";
import { getCatalogAudit } from "../service/auditService";

export default function AuditLog() {
  const [catalogAudit, setCatalogAudit] = useState<CatalogAudit[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchAudits() {
      try {
        const logs = await getCatalogAudit();
        setCatalogAudit(logs);
      } catch (error) {
        console.error("Error al cargar auditoría:", error);
      }
    }
    fetchAudits();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [catalogAudit]);

  return (
    <div className={styles.auditContainer}>
      <div className={styles.auditTitle}>Auditoría de Catálogo</div>
      {catalogAudit.map((log) => (
        <div key={log.id} className={styles.auditLine}>
          [{new Date(log.changedAt).toLocaleString()}] {log.operation} en {log.tableName} (ID: {log.recordId})
        </div>
      ))}
      <div ref={bottomRef} className={styles.blinkCursor}></div>
    </div>
  );
}
