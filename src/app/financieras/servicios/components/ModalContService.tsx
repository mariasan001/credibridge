// components/lender-services/ModalContService.tsx

import React from "react";
import styles from "./ModalContService.module.css";
import { LenderService } from "../types/lenderService";
import LenderServiceForm from "./LenderServiceForm";

interface Props {
  visible: boolean; // Muestra u oculta el modal
  onClose: () => void; // Cierra el modal
  initialData?: Partial<LenderService>; // Datos iniciales (para edición)
  onSubmit: (data: Partial<LenderService>) => void; // Función al guardar
}

const ModalContService: React.FC<Props> = ({
  visible,
  onClose,
  initialData,
  onSubmit,
}) => {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Encabezado con botón cerrar */}
        <div className={styles.header}>
          <h2>Formulario de Servicio</h2>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>

        {/* Formulario */}
        <LenderServiceForm
          initialData={initialData}
          onSubmit={(data) => {
            onSubmit(data);   // Envía los datos al componente padre
            onClose();        // Cierra el modal después de enviar
          }}
          onCancel={onClose}  // Permite cancelar/ocultar el modal
        />
      </div>
    </div>
  );
};

export default ModalContService;
