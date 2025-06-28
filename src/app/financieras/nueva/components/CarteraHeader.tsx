'use client';
import { useState } from "react";
import { Download } from "lucide-react";
import { LenderForm } from "./LenderForm";
import { Modal } from "./Modal";
import "./CarteraHeader.css";

export function CarteraHeader() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSuccess = () => {
    setModalOpen(false);
    // Opcional: recargar tabla de financieras si estás en la misma vista
  };

  return (
    <>
      <div className="cartera-header">
        <div className="cartera-header__info">
          <h2>Financieras Activas</h2>
          <p>Ingresa los datos correspondientes para poder obtener la información correspondiente</p>
        </div>
        <button className="cartera-header__btn" onClick={() => setModalOpen(true)}>
        
          Agregar Nueva Financiera
        </button>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h3>Agregar Financiera</h3>
        <LenderForm onSuccess={handleSuccess} onCancel={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}
