"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadPayrollFile } from "../service/payrollService";
import { Folder } from "lucide-react";
import "./PayrollUploader.css";

export default function PayrollUploader() {
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
    if (!file) {
      toast.error("Selecciona un archivo .dbf");
      return;
    }

    setLoading(true);
    try {
      const res = await uploadPayrollFile(file, period, year);
      toast.success(res.message || "Archivo subido exitosamente ✅");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data?.message || error.message || "Error inesperado del servidor";
        toast.error("Error del servidor: " + serverMessage);
      } else if (error instanceof Error) {
        toast.error("Error desconocido: " + error.message);
      } else {
        toast.error("Error desconocido al subir el archivo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payrollUploader-container">
      <div className="payrollUploader-card">
        <Folder className="payrollUploader-icon" size={56} strokeWidth={1.5} />
        <h2 className="payrollUploader-subtitle">Subir Archivo de Nómina</h2>
        <p className="payrollUploader-description">
          Selecciona el periodo, año y archivo que deseas subir. <br />
          <strong>Solo se permiten archivos .dbf</strong>
        </p>

        <div className="payrollUploader-formGroup">
          <input
            type="number"
            placeholder="Periodo"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Año"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>

        <label className="payrollUploader-dropFile">
          <input
            type="file"
            accept=".dbf"
            onChange={handleFileChange}
            className="payrollUploader-fileInput"
          />
          {file ? file.name : "Selecciona o arrastra un archivo .dbf"}
        </label>

        <button className="buttonn" onClick={handleUpload} disabled={loading}>
          {loading ? "Subiendo..." : "Subir Archivo"}
        </button>
      </div>
    </div>
  );
}
