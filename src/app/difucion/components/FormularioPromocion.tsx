"use client"

import { useEffect, useState } from "react"
import { Plus, X } from "lucide-react"
import { PromotionCreatePayload } from "../model/promocion_model"
import { Promotion } from "../model/promotion_model_todas"
import { crearPromocion } from "../services/promo_services"
import { actualizarPromocion } from "../services/promo_services_editar"
import "./FormularioPromocion.css"

interface Props {
  lenderId: number
  lenderName: string
  promocionEditando?: Promotion | null
  onActualizarExito?: () => void
}

export function FormularioPromocion({
  lenderId,
  lenderName,
  promocionEditando,
  onActualizarExito,
}: Props) {
  const [formData, setFormData] = useState<Omit<PromotionCreatePayload, "benefits">>({
    promotionTitle: "",
    promotionDesc: "",
    startDate: "",
    endDate: "",
    webIcon: "",
    mobileIcon: "",
    lenderServiceId: 1,
    lenderId,
  })

  const [benefitsList, setBenefitsList] = useState<string[]>([""])
  const [modoEdicion, setModoEdicion] = useState(false)

  useEffect(() => {
    if (promocionEditando) {
      setModoEdicion(true)
      setFormData({
        promotionTitle: promocionEditando.promotionTitle,
        promotionDesc: promocionEditando.promotionDesc,
        startDate: promocionEditando.startDate,
        endDate: promocionEditando.endDate,
        webIcon: promocionEditando.webIcon ?? "",
        mobileIcon: promocionEditando.mobileIcon ?? "",
        lenderServiceId: 1,
        lenderId,
      })

      const beneficiosSeparados =
        promocionEditando.benefits?.map((b) => b.benefitsDesc.trim()) || []

      setBenefitsList(beneficiosSeparados.length > 0 ? beneficiosSeparados : [""])
    } else {
      setModoEdicion(false)
      setBenefitsList([""])
    }
  }, [promocionEditando, lenderId])

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

    // ✅ Enviar beneficios como arreglo de objetos
    const formattedBenefits = benefitsList
      .filter((b) => b.trim() !== "")
      .map((b) => ({ benefitsDesc: b.trim() }))

    const payload: PromotionCreatePayload = {
      ...formData,
      benefits: formattedBenefits,
    }

    try {
      if (modoEdicion && promocionEditando) {
        await actualizarPromocion(promocionEditando.id, payload)
        alert("¡Promoción actualizada correctamente!")
      } else {
        await crearPromocion(payload)
        alert("¡Promoción creada correctamente!")
      }

      onActualizarExito?.()
      resetFormulario()
    } catch (error: any) {
      const res = error?.response
      alert(
        "Error al guardar: " +
          (res?.data?.message || res?.data?.error || error.message || "Error desconocido")
      )
    }
  }

  const resetFormulario = () => {
    setFormData({
      promotionTitle: "",
      promotionDesc: "",
      startDate: "",
      endDate: "",
      webIcon: "",
      mobileIcon: "",
      lenderServiceId: 1,
      lenderId,
    })
    setBenefitsList([""])
    setModoEdicion(false)
  }

  return (
    <div className="formulario">
      <h1>{modoEdicion ? "Editar Promoción" : "Crear Promoción"}</h1>

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
                placeholder={`Benéficio ${index + 1}`}
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

        <button
          type="submit"
          className={`button-submit ${modoEdicion ? "bg-yellow-600" : ""}`}
        >
          {modoEdicion ? "Actualizar promoción" : "Crear promoción"}
        </button>
      </form>
    </div>
  )
}
