import { useState } from "react";
import { LenderService } from "../types/lenderService";
import { createLenderService } from "../services/lenderService";
import { toast } from "react-hot-toast";
import ModalContService from "./ModalContService";

// CarteraHeader.tsx
interface Props {
  onCreateSuccess: () => void; // 🔁 Llamada cuando se crea un servicio
}

export function CarteraHeader({ onCreateSuccess }: Props) {
  const [showModal, setShowModal] = useState(false);

 const handleSubmit = async (data: Partial<LenderService>) => {
  try {
    await createLenderService(data);
    toast.success("Servicio guardado exitosamente");
    setShowModal(false);
    onCreateSuccess(); // 🔁 Notifica al padre
  } catch (error: any) {
    toast.error("Error al guardar el servicio");

    // ✅ Mostrar detalles completos del error de Axios
    console.error("❌ Error al crear servicio:", {
      mensaje: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
      url: error?.config?.url,
      method: error?.config?.method,
      headers: error?.config?.headers,
      payload_enviado: error?.config?.data,
    });
  }
};


  return (
    <>
      <div className="cartera-header">
        <div className="cartera-header__info">
          <h2>Nuevo Servicio</h2>
          <p>Ingresa los datos correspondientes para poder obtener la información correspondiente</p>
        </div>
        <button className="cartera-header__btn" onClick={() => setShowModal(true)}>
         
          Agregar Nuevo Servicio
        </button>
      </div>

      {showModal && (
        <ModalContService
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
