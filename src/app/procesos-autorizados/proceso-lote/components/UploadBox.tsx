// components/UploadBox.tsx
import { useState } from "react";
import styles from "./UploadBox.module.css";

interface Props {
  title: string;
  onUpload: (file: File) => Promise<void>;
}

export default function UploadBox({ title, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus("loading");
    try {
      await onUpload(file);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.uploadBox}>
      <h2 className={styles.title}>{title}</h2>
      
      <label className={styles.dropArea}>
        <span className={styles.icon}>📁</span>
        <span className={styles.text}>Arrastra o haz clic para subir un archivo .dbf</span>
        <input
          type="file"
          accept=".dbf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className={styles.input}
        />
      </label>

      <button type="submit" className={styles.button}>
        Subir archivo
      </button>

      {status === "success" && (
        <p className={`${styles.message} ${styles.success}`}>
          Archivo subido con éxito.
        </p>
      )}
      {status === "error" && (
        <p className={`${styles.message} ${styles.error}`}>
          Error al subir el archivo.
        </p>
      )}
    </form>
  );
}
