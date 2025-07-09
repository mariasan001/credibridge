"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadPayrollFile } from "../service/payrollService";
import { Folder } from "lucide-react";
import "./payrollUploader.css";

type Props = {
  onUploadSuccess: () => void;
};

export default function PayrollUploader({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [period, setPeriod] = useState<number>(1);
  const [year, setYear] = useState<number>(2025);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Selecciona un archivo .dbf");

    setLoading(true);
    try {
      const res = await uploadPayrollFile(file, period, year);
      toast.success(res.message || "Archivo subido exitosamente ✅");

      // 🔁 Avisar al padre que recargue la lista
      onUploadSuccess();
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
        ? error.message
        : "Error desconocido al subir el archivo";
      toast.error("Error: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <div className="uploader-card">
        <Folder className="uploader-icon" size={56} strokeWidth={1.5} />
        <h2 className="uploader-title">Subir Archivo de Nómina</h2>
        <p className="uploader-description">
          Selecciona el periodo, año y archivo que deseas subir. <br />
          <strong>Solo se permiten archivos .dbf</strong>
        </p>

        <div className="uploader-form">
          <label>
            <input
              type="number"
              placeholder="Periodo"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              min={1}
              max={24}
              required
            />
          </label>
          <label>
            <input
              type="number"
              placeholder="Año"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              min={2000}
              max={2100}
              required
            />
          </label>
        </div>

        <label className="uploader-drop">
          <input
            type="file"
            accept=".dbf"
            onChange={handleFileChange}
            className="uploader-input"
          />
          {file ? file.name : "Selecciona o arrastra un archivo .dbf"}
        </label>

        <button className="uploader-button" onClick={handleUpload} disabled={loading}>
          {loading ? "Subiendo..." : "Subir Archivo"}
        </button>
      </div>
    </div>
  );
}
