"use client";

import { useState } from "react";
import axios from "axios";
import { uploadPayrollFile } from "../service/payrollService";
import { Folder } from "lucide-react";
import "./payrollUploader.css";

export default function PayrollUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [period, setPeriod] = useState<number>(1);
  const [year, setYear] = useState<number>(2025);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo .dbf");
    setLoading(true);
    try {
      const res = await uploadPayrollFile(file, period, year);
      setMessage(res.message || "Archivo subido exitosamente ✅");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data?.message || error.message || "Error inesperado del servidor";
        setMessage("Error del servidor: " + serverMessage);
      } else if (error instanceof Error) {
        setMessage("Error desconocido: " + error.message);
      } else {
        setMessage("Error desconocido al subir el archivo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="model-container_PayrollUploader">
      <div className="upload-card">
        <Folder className="upload-icon" size={56} strokeWidth={1.5} />
        <h2 className="subtitle">Subir Archivo de Nómina</h2>
        <p className="description">
          Selecciona el periodo, año y archivo que deseas subir. <br />
          <strong>Solo se permiten archivos .dbf</strong>
        </p>

        <div className="form-group">
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

        <label className="file-drop">
          <input
            type="file"
            accept=".dbf"
            onChange={handleFileChange}
            className="file-input"
          />
          {file ? file.name : "Selecciona o arrastra un archivo .dbf"}
        </label>

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Subiendo..." : "Subir Archivo"}
        </button>

        {message && <div className="status">{message}</div>}
      </div>
    </div>
  );
}