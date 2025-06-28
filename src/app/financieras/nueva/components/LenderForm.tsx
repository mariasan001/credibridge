'use client';
import { useState, useEffect } from "react";
import styles from "./LenderForm.module.css";
import { Lender } from "../types/lender";
import { createLender, updateLender } from "../services/lenderService";

interface Props {
  selected?: Lender | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const LenderForm = ({ selected, onSuccess, onCancel }: Props) => {
  const [formData, setFormData] = useState<Partial<Lender>>({
    lenderName: "",
    lenderDesc: "",
    lenderEmail: "",
    lenderPhone: "",
    photo: "",
    active: true,
  });

  useEffect(() => {
    if (selected) {
      setFormData({
        lenderName: selected.lenderName,
        lenderDesc: selected.lenderDesc,
        lenderEmail: selected.lenderEmail,
        lenderPhone: selected.lenderPhone,
        photo: selected.photo,
        active: selected.active,
      });
    }
  }, [selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      await updateLender(selected.id, formData);
    } else {
      await createLender(formData);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="lenderName"
        value={formData.lenderName || ''}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <textarea
        name="lenderDesc"
        value={formData.lenderDesc || ''}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <input
        name="lenderEmail"
        type="email"
        value={formData.lenderEmail || ''}
        onChange={handleChange}
        placeholder="Correo"
      />
      <input
        name="lenderPhone"
        value={formData.lenderPhone || ''}
        onChange={handleChange}
        placeholder="Teléfono"
      />
      <input
        name="photo"
        value={formData.photo || ''}
        onChange={handleChange}
        placeholder="URL de foto"
      />

      <div className={styles.actions}>
        <button type="submit">
          {selected ? "Actualizar" : "Crear"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};
