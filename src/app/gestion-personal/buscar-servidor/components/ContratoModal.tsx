import { useRef, useState } from "react";
import { Usuario } from "@/model/usuario.models";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { uploadDebtPurchase } from "../service/debtPurchase";
import { toast } from "sonner"; // ✅ Usando sonner
import styles from "./ContratoModal.module.css"; // ✅ CSS aislado

interface Props {
  contrato: any;
  usuarioActual: Usuario;
  onClose: (exito?: boolean) => void;
}

export function ContratoModal({ contrato, usuarioActual, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast.error("Solo se permite subir archivos PDF.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast.error("Solo se permite subir archivos PDF.");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Selecciona un archivo PDF.");
      return;
    }

    if (!usuarioActual.lender?.id) {
      toast.error("No se encontró la financiera.");
      return;
    }

    const payload = {
      createdBy: contrato.user?.userId,
      debtOperatorId: usuarioActual.userId,
      sellingLenderId: usuarioActual.lender.id,
    };

    try {
      setLoading(true);
      const response = await uploadDebtPurchase(payload, selectedFile);
      const idDbtPurchase = response?.idDbtPurchase;
      if (idDbtPurchase) {
        localStorage.setItem("idDbtPurchase", idDbtPurchase.toString());
      }
      toast.success("Archivo enviado correctamente.");
      setSelectedFile(null);
      onClose(true);
    } catch (error) {
      console.error("Error al enviar archivo:", error);
      toast.error("Hubo un error al enviar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={() => onClose()}>
      <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
        <button className={styles["close-btn"]} onClick={() => onClose()}>
          <FaTimes size={16} />
        </button>

        <h3>Carta de Autolización de Compra de Deuda</h3>

        <ul className={styles["detalle-contrato"]}></ul>

        <div
          className={styles["upload-modern"]}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={styles["upload-icon"]}><FaCloudUploadAlt size={40} /></div>
          <p className={styles["upload-title"]}>Arrastra un archivo PDF aquí o haz clic</p>
          <p className={styles["upload-desc"]}>Solo PDF - Máximo 10MB</p>
          {selectedFile && <p className={styles["file-name"]}>📄 {selectedFile.name}</p>}
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className={styles["btn-row"]}>
          <button className={styles["send-btn"]} onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar archivo"}
          </button>
        </div>
      </div>
    </div>
  );
}
