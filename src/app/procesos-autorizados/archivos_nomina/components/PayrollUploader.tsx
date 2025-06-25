"use client";

import { useState } from "react";
import axios from "axios";
import { uploadPayrollFile } from "../service/payrollService";

export default function PayrollUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [period, setPeriod] = useState<number>(1);
  const [year, setYear] = useState<number>(2025);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Selecciona un archivo .dbf");
    setLoading(true);
    try {
      const res = await uploadPayrollFile(file, period, year);
      setMessage(res.message || "Archivo subido exitosamente");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error general:", error.message);
      }

      if (axios.isAxiosError(error)) {
        const serverMessage =
          error.response?.data?.message || error.message || "Error inesperado del servidor";
        console.error("Axios error:", error);
        setMessage("Error del servidor: " + serverMessage);
      } else {
        setMessage("Error desconocido al subir el archivo");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label>Periodo: </label>
        <input
          type="number"
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
          className="input"
        />
      </div>
      <div>
        <label>Año: </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="input"
        />
      </div>
      <div>
        <input type="file" accept=".dbf" onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload} disabled={loading} className="btn">
        {loading ? "Subiendo..." : "Subir Archivo"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
