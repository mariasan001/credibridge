// src/app/comparativas/reportes/models/types/report.ts

export interface Report {
  id: string;
  reportType: string;
  status: string;
  progress: number;
  createdAt: string;
  finishedAt: string;
  filePath: string;
}