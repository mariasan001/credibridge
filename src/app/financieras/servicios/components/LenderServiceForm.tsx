import React, { useState } from "react";
import styles from "./LenderServiceForm.module.css";
import { LenderService } from "../types/lenderService";

interface Props {
  initialData?: Partial<LenderService>;
  onSubmit: (data: Partial<LenderService>) => void;
  onCancel?: () => void;
}

const LenderServiceForm: React.FC<Props> = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<LenderService>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : Number(value) || value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
      <div className={styles.grid}>
        <input name="lenderServiceDesc" placeholder="Descripción" value={formData.lenderServiceDesc || ""} onChange={handleChange}  />
        <input name="lenderId" placeholder="Lender ID" type="number" value={formData.lenderId || ""} onChange={handleChange}  />
        <input name="rate" placeholder="Tasa (%)" type="number" value={formData.rate || ""} onChange={handleChange}  />
        <input name="serviceTypeId" placeholder="Tipo Servicio ID" type="number" value={formData.serviceTypeId || ""} onChange={handleChange}  />
        <input name="minValue" placeholder="Valor Mínimo" type="number" value={formData.minValue || ""} onChange={handleChange}  />
        <input name="maxValue" placeholder="Valor Máximo" type="number" value={formData.maxValue || ""} onChange={handleChange}  />
        <input name="frequency" placeholder="Frecuencia" type="number" value={formData.frequency || ""} onChange={handleChange}  />
        <input name="minimumDiscountAmountForInclusion" placeholder="Monto mínimo descuento" type="number" value={formData.minimumDiscountAmountForInclusion || ""} onChange={handleChange}  />
        <input name="minimumAmountPerContract" placeholder="Monto mínimo por contrato" type="number" value={formData.minimumAmountPerContract || ""} onChange={handleChange}  />
        <input name="minimumTotalAmount" placeholder="Monto total mínimo" type="number" value={formData.minimumTotalAmount || ""} onChange={handleChange}  />
        <input name="maximumTerm" placeholder="Plazo Máximo" type="number" value={formData.maximumTerm || ""} onChange={handleChange}  />
        <label className={styles.checkbox}>
          <input name="active" type="checkbox" checked={formData.active || false} onChange={handleChange} />
          Activo
        </label>
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.save}>Guardar</button>
        {onCancel && <button type="button" className={styles.cancel} onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
};

export default LenderServiceForm;
