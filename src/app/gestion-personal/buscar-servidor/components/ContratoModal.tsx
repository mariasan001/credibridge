import { useRef, useState } from "react"
import { Usuario } from "@/model/usuario.models"
import "./ContratoModal.css"
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"
import { uploadDebtPurchase } from "../service/debtPurchase"

interface Props {
  contrato: any
  usuarioActual: Usuario
  onClose: (exito?: boolean) => void  // Se espera un argumento opcional
}

export function ContratoModal({ contrato, usuarioActual, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    } else {
      alert("Solo se permite subir archivos PDF.")
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    } else {
      alert("Solo se permite subir archivos PDF.")
    }
  }

const handleSubmit = async () => {
  if (!selectedFile) {
    alert("Primero debes seleccionar un archivo PDF.")
    return
  }

  if (!usuarioActual.lender?.id) {
    alert("No se encontró información de la financiera del gestor.")
    return
  }

  const payload = {
    createdBy: contrato.user?.userId,
    debtOperatorId: usuarioActual.userId,
    sellingLenderId: usuarioActual.lender.id
  }

  try {
    const response = await uploadDebtPurchase(payload, selectedFile)

    // ✅ Extraer el ID de la respuesta y almacenarlo si es necesario
    const idDbtPurchase = response?.idDbtPurchase
    if (idDbtPurchase) {
      localStorage.setItem("idDbtPurchase", idDbtPurchase.toString()) // O usa otra lógica de almacenamiento
    }

    alert("Archivo enviado correctamente.")
    setSelectedFile(null)
    onClose(true) // Indica éxito al cerrar
  } catch (error) {
    console.error("Error al enviar archivo:", error)
    alert("Error al enviar el archivo.")
  }
}


  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="close-btn" onClick={() => onClose()}>
          <FaTimes size={16} />
        </button>

        <h3>Información del Contrato</h3>

        <ul className="detalle-contrato">
          <li><strong>Gestor:</strong> {usuarioActual.name} (ID: {usuarioActual.userId})</li>
          <li><strong>Usuario:</strong> {contrato.user?.name || "N/A"} (ID: {contrato.user?.userId || "N/A"})</li>
          <li><strong>Financiera (gestor):</strong> {usuarioActual.lender?.lenderName || "N/A"} (ID: {usuarioActual.lender?.id ?? "N/A"})</li>
        </ul>

        <div
          className="upload-modern"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon"><FaCloudUploadAlt size={40} /></div>
          <p className="upload-title">Arrastra un archivo PDF aquí o haz clic</p>
          <p className="upload-desc">Solo PDF - Máximo 10MB</p>
          {selectedFile && <p className="file-name">📄 {selectedFile.name}</p>}
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="btn-row">
          <button className="send-btn" onClick={handleSubmit}>Enviar archivo</button>
        </div>

      </div>
    </div>
  )
}
