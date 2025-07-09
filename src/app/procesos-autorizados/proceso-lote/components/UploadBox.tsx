"use client";

import { useState } from "react";
import styles from "./AdvancedUploadBox.module.css";
import { FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  heading: string;
  description: string;
  imageSrc?: string;
  accept?: string;
  onUpload: (file: File) => Promise<void>;
}

export default function AdvancedUploadBox({
  heading,
  description,
  imageSrc,
  accept = ".dbf",
  onUpload,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setProgress(0);
    setStatus("uploading");

    try {
      const fakeProgress = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(fakeProgress);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await onUpload(selected);

      clearInterval(fakeProgress);
      setProgress(100);
      setStatus("success");
      toast.success("Archivo subido con éxito.");
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Error al subir el archivo.");
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{heading}</h3>
      <p className={styles.description}>{description}</p>

      <label className={styles.dropZone}>
        {imageSrc ? (
          <img src={imageSrc} alt="Ícono de carga" className={styles.image} />
        ) : (
          <Loader2 className={styles.icon} />
        )}
        <span className={styles.text}>
          {file ? file.name : "Arrastra un archivo o haz clic para subir .dbf"}
        </span>
        <input type="file" accept={accept} onChange={handleChange} className={styles.input} />
      </label>

      {file && (
        <div className={styles.progressBox}>
          <div className={styles.fileInfo}>
            <FileText className={styles.fileIcon} />
            <span className={styles.fileName}>{file.name}</span>
            <span className={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progress} ${
                status === "success"
                  ? styles.success
                  : status === "error"
                  ? styles.error
                  : ""
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
