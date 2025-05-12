"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { PromotionCreatePayload } from "../model/promocion_model"
import { crearPromocion } from "../services/promo_services"

interface Props {
  lenderId: number
  lenderName: string
}

export function FormularioPromocion({ lenderId, lenderName }: Props) {
  const [formData, setFormData] = useState<Omit<PromotionCreatePayload, 'benefits'>>({
    promotionTitle: "",
    promotionDesc: "",
    startDate: "",
    endDate: "",
    webIcon: "",
    mobileIcon: "",
    lenderServiceId: lenderId,
    lenderId: lenderId
  })

  const [benefitsList, setBenefitsList] = useState<string[]>([""])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...benefitsList]
    updated[index] = value
    setBenefitsList(updated)
  }

  const handleAddBenefit = () => {
    setBenefitsList([...benefitsList, ""])
  }

  const handleRemoveBenefit = (index: number) => {
    const updated = [...benefitsList]
    updated.splice(index, 1)
    setBenefitsList(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.promotionTitle.trim() ||
      !formData.promotionDesc.trim() ||
      !formData.startDate ||
      !formData.endDate ||
      benefitsList.every((b) => b.trim() === "")
    ) {
      alert("Por favor completa todos los campos requeridos.")
      return
    }

    const formattedBenefits = benefitsList
      .filter((b) => b.trim() !== "")
      .map((b) => `• ${b.trim()}`)
      .join("\n")

    const payload: PromotionCreatePayload = {
      ...formData,
      benefits: [{ benefitsDesc: formattedBenefits }]
    }

    try {
      const response = await crearPromocion(payload)
      console.log("✅ Promoción creada:", response)
      alert("¡Promoción creada correctamente!")
    } catch (error: any) {
      const res = error?.response
      alert(
        "Error al crear la promoción: " +
          (res?.data?.message ||
            res?.data?.error ||
            error.message ||
            "Error desconocido")
      )
    }
  }

  return (
    <div className="formulario">
      <h1>Crear Promoción</h1>

      <div className="input-group-wrapper">
        <label className="input-label">Financiera asignada</label>
        <input
          type="text"
          value={lenderName}
          readOnly
          disabled
          className="input-group"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group-wrapper">
          <label className="input-label">Título</label>
          <input
            name="promotionTitle"
            type="text"
            value={formData.promotionTitle}
            onChange={handleChange}
            className="input-group"
          />
        </div>

        <div className="input-group-wrapper">
          <label className="input-label">Descripción</label>
          <textarea
            name="promotionDesc"
            value={formData.promotionDesc}
            onChange={handleChange}
            className="input-group"
            rows={4}
          />
        </div>

        <div className="input-group-wrapper">
          <label className="input-label">Fecha de inicio</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input-group"
          />
        </div>

        <div className="input-group-wrapper">
          <label className="input-label">Fecha de fin</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input-group"
          />
        </div>

        <div className="input-group-wrapper">
          <label className="input-label">Beneficios</label>
          {benefitsList.map((benefit, index) => (
            <div key={index} className="benefit-row">
              <input
                type="text"
                placeholder={`Benéfico ${index + 1}`}
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
                className="input-group benefit-input"
              />
              {benefitsList.length > 1 && (
                <button
                  type="button"
                  className="benefit-remove"
                  onClick={() => handleRemoveBenefit(index)}
                  aria-label="Eliminar beneficio"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          <button type="button" className="button-add" onClick={handleAddBenefit}>
            <Plus size={16} />
            Agregar beneficio
          </button>
        </div>

        <button type="submit" className="button-submit">
          Crear promoción
        </button>
      </form>
    </div>
  )
}
