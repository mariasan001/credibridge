"use client";

import { useEffect, useState } from "react";
import styles from "./AuditLog.module.css";
import { CatalogAudit, UserAudit } from "../model/auditTypes";
import { getCatalogAudit, getUserAudit } from "../service/auditService";

export default function AuditLog() {
  const [userAudit, setUserAudit] = useState<UserAudit[]>([]);
  const [catalogAudit, setCatalogAudit] = useState<CatalogAudit[]>([]);

  useEffect(() => {
    async function fetchAudits() {
      const userLogs = await getUserAudit();
      const catalogLogs = await getCatalogAudit();
      setUserAudit(userLogs);
      setCatalogAudit(catalogLogs);
    }
    fetchAudits();
  }, []);

  return (
    <div className={styles.auditContainer}>
      <div className={styles.auditSection}>
        <h2 className={styles.auditTitle}>Auditoría de Usuario</h2>
        <ul className={styles.auditList}>
          {userAudit.map((log) => (
            <li key={log.id}>
              [{new Date(log.auditTimestamp).toLocaleString()}] {log.userId} - {log.operation}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.auditSection}>
        <h2 className={styles.auditTitle}>Auditoría de Catálogo</h2>
        <ul className={styles.auditList}>
          {catalogAudit.map((log) => (
            <li key={log.id}>
              [{new Date(log.changedAt).toLocaleString()}] {log.operation} en {log.tableName} (ID: {log.recordId})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
