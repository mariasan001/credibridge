// components/UploadBox.tsx
import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="border p-4 rounded space-y-3">
      <h2 className="font-bold">{title}</h2>
      <input
        type="file"
        accept=".dbf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
        Subir archivo
      </button>

      {status === "success" && <p className="text-green-600">Archivo subido con éxito.</p>}
      {status === "error" && <p className="text-red-600">Error al subir el archivo.</p>}
    </form>
  );
}
