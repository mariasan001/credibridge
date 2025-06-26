"use client";

import { useState } from "react";
import styles from "./UploadBox.module.css";
import toast from "react-hot-toast";
import { Loader2, UploadCloud } from "lucide-react";

interface Props {
  title: string;
  onUpload: (file: File) => Promise<void>;
}

export default function UploadBox({ title, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Selecciona un archivo antes de subir.");
      return;
    }

    setStatus("loading");

    try {
      await onUpload(file);
      setStatus("success");
      toast.success("Archivo subido con éxito.");
      setFile(null);
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Hubo un error al subir el archivo.");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.uploadBox}>
      <h2 className={styles.title}>{title}</h2>

      <label className={styles.dropArea}>
        <UploadCloud className={styles.icon} />
        <span className={styles.text}>
          {file ? file.name : "Arrastra o haz clic para subir un archivo .dbf"}
        </span>
        <input
          type="file"
          accept=".dbf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className={styles.input}
        />
      </label>

      <button
        type="submit"
        className={styles.button}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <Loader2 className={styles.spinner} />
        ) : (
          "Subir archivo"
        )}
      </button>
    </form>
  );
}
