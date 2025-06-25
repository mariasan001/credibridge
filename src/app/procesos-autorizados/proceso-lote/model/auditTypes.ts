export interface UserAudit {
  id: number;
  userId: string;
  operation: string;
  auditTimestamp: string;
}

export interface CatalogAudit {
  id: number;
  tableName: string;
  operation: string;
  recordId: string;
  changedData: Record<string, any>;
  changedAt: string;
}
