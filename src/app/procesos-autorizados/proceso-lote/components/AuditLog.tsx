"use client";

import { useEffect, useState } from "react";
import styles from "./AuditLog.module.css";
import { CatalogAudit, UserAudit } from "../model/auditTypes";
import { getCatalogAudit, getUserAudit } from "../service/auditService";
import { Clock, Database, User } from "lucide-react"; // íconos opcionales

export default function AuditLog() {
  const [userAudit, setUserAudit] = useState<UserAudit[]>([]);
  const [catalogAudit, setCatalogAudit] = useState<CatalogAudit[]>([]);

  useEffect(() => {
    async function fetchAudits() {
      try {
        const userLogs = await getUserAudit();
        const catalogLogs = await getCatalogAudit();
        setUserAudit(userLogs);
        setCatalogAudit(catalogLogs);
      } catch (error) {
        console.error("Error al cargar auditorías:", error);
      }
    }
    fetchAudits();
  }, []);

  return (
    <div className={styles.auditContainer}>
      <section className={styles.auditSection}>
        <h2 className={styles.auditTitle}><User size={18} /> Auditoría de Usuario</h2>
        <ul className={styles.auditList}>
          {userAudit.map((log) => (
            <li key={log.id} className={styles.auditItem}>
              <Clock size={14} /> <span>[{new Date(log.auditTimestamp).toLocaleString()}]</span>
              <span>{log.userId} - {log.operation}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.auditSection}>
        <h2 className={styles.auditTitle}><Database size={18} /> Auditoría de Catálogo</h2>
        <ul className={styles.auditList}>
          {catalogAudit.map((log) => (
            <li key={log.id} className={styles.auditItem}>
              <Clock size={14} /> <span>[{new Date(log.changedAt).toLocaleString()}]</span>
              <span>{log.operation} en {log.tableName} (ID: {log.recordId})</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
