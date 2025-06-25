export interface PayrollUploadResponse {
  message: string;
  status?: string;
}


export interface PayrollFile {
  id: number;
  originalName: string;
  fileName: string;
  contentType: string;
  filePath: string;
  period: number;
  year: number;
  uploadDate: string;
}
