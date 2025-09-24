import React from "react";
import "./TicketFileBubble.css";
import { TicketFileModel } from "../model/TicketFileModel";
import {
  FileText,
  Image,
  Table,
  FileSignature,
  Package,
  File,
  Download,
} from "lucide-react";

interface Props {
  file: TicketFileModel;
}

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://10.0.32.53:2910";

const getExtension = (filename: string = ""): string => {
  return filename.split(".").pop()?.toLowerCase() || "other";
};

const getFileClass = (filename?: string): string => {
  const ext = getExtension(filename);
  if (ext === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) return "image";
  if (["xls", "xlsx", "csv"].includes(ext)) return "excel";
  if (["doc", "docx"].includes(ext)) return "word";
  if (["zip", "rar", "7z"].includes(ext)) return "zip";
  return "other";
};

const getFileIcon = (filename?: string) => {
  const ext = getExtension(filename);
  if (ext === "pdf") return <FileText className="icon pdf" />;
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) return <Image className="icon image" />;
  if (["xls", "xlsx", "csv"].includes(ext)) return <Table className="icon excel" />;
  if (["doc", "docx"].includes(ext)) return <FileSignature className="icon word" />;
  if (["zip", "rar", "7z"].includes(ext)) return <Package className="icon zip" />;
  return <File className="icon other" />;
};

export const TicketFileBubble: React.FC<Props> = ({ file }) => {
  return (
    <div className={`file-bubble ${getFileClass(file.filename)}`}>
      <div className="file-info">
        {getFileIcon(file.filename)}
        <div className="file-details">
          <strong className="filename">{file.filename || "SIN NOMBRE"}</strong>
          <span className="file-date">
            {new Date(file.uploadDate).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="file-actions">
        <a
          href={`${apiBase}/api/tickets/download/${file.id}`}
          title="Descargar archivo"
        >
          <Download size={18} />
        </a>
      </div>
    </div>
  );
};
