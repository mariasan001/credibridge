'use client';

import React, { useState } from "react";
import "./CarteraHeader.css";
import { Download } from "lucide-react";
import { LenderService } from "../types/lenderService";
import { toast } from "react-hot-toast";
import { createLenderService } from "../services/lenderService";
import ModalContService from "./ModalContService";

export function CarteraHeader() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (data: Partial<LenderService>) => {
    try {
      await createLenderService(data);
      toast.success("Servicio guardado exitosamente");
      setShowModal(false);
      // Aquí puedes recargar la lista si lo necesitas
    } catch (error) {
      toast.error("Error al guardar el servicio");
      console.error("Error al crear servicio:", error);
    }
  };

  return (
    <>
      <div className="cartera-header">
        <div className="cartera-header__info">
          <h2>Nuevo Servicio</h2>
          <p>Ingresa los datos correspondientes para poder obtener la información correspondiente</p>
        </div>
        <button
          className="cartera-header__btn"
          onClick={() => setShowModal(true)}
        >
          <Download size={16} />
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
