"use client";

import { useState, useEffect } from "react";

import { SimType } from "../models/tipoSimulacionModel";
import { SimulationRequest, SimulationResult } from "../models/formularioSolicitud";
import { SolicitudContrato } from "../models/solicitudContratoModel";
import { getSimTypes } from "../services/solicitarPrestamo";
import { simulateDiscount } from "../services/formularioSolicitud";
import { ResultadosSimulacion } from "./ResultadosSimulacion";
import { getUserDiscountLimit } from "../../inicio/services/limite_service";
import "./formularioSolicitud.css";
import { solicitarContrato } from "../services/contrato_service";
import { useAuth } from "@/hooks/useAuth";

export const SimuladorCreditoForm = () => {
  const { user } = useAuth();

  const [simTypes, setSimTypes] = useState<SimType[]>([]);
  const [selectedSimType, setSelectedSimType] = useState<number | "">("");
  const [periods, setPeriods] = useState<number>(12);
  const [paymentAmount, setPaymentAmount] = useState<number>(1000);
  const [telefono, setTelefono] = useState("");
  const [limiteDescuento, setLimiteDescuento] = useState<number | null>(null);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [seleccionado, setSeleccionado] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const sinCreditoDisponible =
    selectedSimType === 1 && limiteDescuento !== null && limiteDescuento < 0;

  useEffect(() => {
    getSimTypes()
      .then(setSimTypes)
      .catch(() => setSimTypes([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedSimType) return;

    const payload: SimulationRequest = {
      userId: user.userId,
      simTypeId: Number(selectedSimType),
      periods,
      paymentAmount,
    };

    setLoading(true);
    try {
      const data = await simulateDiscount(payload);
      setResults(data);
      setSeleccionado(null);
    } catch (err) {
      console.error("Error al simular:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSimTypeChange = (tipo: number) => {
    setSelectedSimType(tipo);
    const tipoSeleccionado = simTypes.find((t) => t.id === tipo);

    if (tipoSeleccionado && tipoSeleccionado.name.toLowerCase().includes("descuento")) {
      if (user) {
        getUserDiscountLimit(user.userId)
          .then((limite) => {
            if (limite < 0) {
              alert("No puedes simular porque no tienes límite de descuento disponible.");
              setSelectedSimType("");
              return;
            }
            setLimiteDescuento(limite);
            setPaymentAmount(limite);
          })
          .catch(() => setLimiteDescuento(null));
      }
    } else {
      if (user) {
        getUserDiscountLimit(user.userId)
          .then((limite) => setLimiteDescuento(limite))
          .catch(() => setLimiteDescuento(null));
      }
    }
  };

  const handleSolicitarPrestamo = async () => {
  if (!user) {
    alert("⚠️ Usuario no autenticado.");
    return;
  }

  if (!seleccionado) {
    alert("⚠️ Debes seleccionar una opción de simulación.");
    return;
  }

  if (!selectedSimType) {
    alert("⚠️ Tipo de simulación inválido.");
    return;
  }

  if (!telefono.match(/^[0-9]{10}$/)) {
    alert("⚠️ Ingresa un número de teléfono válido de 10 dígitos.");
    return;
  }

  const esValorLiberado = selectedSimType === 1;

  const payload: SolicitudContrato = {
    lenderId: seleccionado.lenderServiceId,
    userId: user.userId,
    contractType: selectedSimType,
    installments: periods,
    amount: esValorLiberado ? paymentAmount : seleccionado.capital,
    biweeklyDiscount: esValorLiberado ? seleccionado.capital : paymentAmount,
    effectiveRate: seleccionado.effectivePeriodRate,
    effectiveAnnualRate: seleccionado.effectiveAnnualRate,
    phone: telefono,
  };

  console.log("📦 Payload construido para enviar:", JSON.stringify(payload, null, 2));

  try {
    const response = await solicitarContrato(payload);
    console.log("✅ Respuesta del backend:", response);
    alert("✅ Contrato enviado correctamente.");
  } catch (error: any) {
    console.error("❌ Error al enviar contrato:", error);

    const mensaje =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.message ||
      "❌ Ocurrió un error al enviar el contrato. Revisa consola para más detalle.";

    alert(mensaje);
  }
};


  const getPaymentLabel = () => {
    const tipoSeleccionado = simTypes.find((t) => t.id === selectedSimType);
    if (!tipoSeleccionado) return "Monto";
    return tipoSeleccionado.name.toLowerCase().includes("valor liberado")
      ? "Monto deseado"
      : "Abono quincenal";
  };

  const getRangeBackground = (value: number, max: number) => {
    const percent = (value / max) * 100;
    return `linear-gradient(to right, rgb(79, 167, 47) 0%, rgb(35, 149, 64) ${percent}%, #ddd ${percent}%, #ddd 100%)`;
  };

  return (
    <div className="simulador-contenedor">
      <div className="simulador-form1">
        <form className="simulador-form" onSubmit={handleSubmit}>
          <h2 className="simulador-title">Simulador de Crédito</h2>

          <label className="simulador-label">
            Tipo de Simulación
            <select
              value={selectedSimType}
              onChange={(e) => handleSimTypeChange(Number(e.target.value))}
              required
            >
              <option value="">Selecciona una opción</option>
              {simTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name.toLowerCase().replace(/^./, (c) => c.toUpperCase())}
                </option>
              ))}
            </select>
          </label>

          <label className="simulador-label">
            Número de Quincenas
            <input
              type="range"
              value={periods}
              min={1}
              max={96}
              onChange={(e) => setPeriods(Number(e.target.value))}
              style={{ background: getRangeBackground(periods, 96) }}
            />
            <div className="simulador-monto-display">{periods} quincenas</div>
          </label>

          <label className="simulador-label">
            {getPaymentLabel()}
            <input
              type="number"
              value={paymentAmount}
              min={1}
              step={0.01}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (limiteDescuento !== null && value > limiteDescuento) {
                  alert("El monto excede tu límite de descuento.");
                }
                setPaymentAmount(value);
              }}
              required
            />
            <div className="simulador-monto-display">
              {paymentAmount.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </div>
          </label>

          <button className="simulador-button" type="submit" disabled={loading}>
            {loading ? "Simulando..." : "Simular"}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="simulador-listado-scroll">
          <ResultadosSimulacion
            results={results}
            seleccionado={seleccionado}
            onSeleccionar={setSeleccionado}
            selectedSimType={selectedSimType}
          />
        </div>
      )}

      {seleccionado && (
        <div className="simulador-ticket">
          <div className="ticket-header">
            Simulación exitosa <br />
            <span className="ticket-sub">{seleccionado.lenderName}</span>
          </div>

          <div className="ticket-body">
            <div className="ticket-row">
              <span>Tasa anual:</span>
              <strong>{seleccionado.effectiveAnnualRate}%</strong>
            </div>
            <div className="ticket-row">
              <span>Tasa por periodo:</span>
              <strong>{seleccionado.effectivePeriodRate}%</strong>
            </div>
            <div className="ticket-row">
              <span>{getPaymentLabel()}:</span>
              <strong>${paymentAmount.toFixed(2)}</strong>
            </div>
            <div className="ticket-row">
              <span>Duración:</span>
              <strong>{periods} quincenas</strong>
            </div>
            <div className="ticket-row">
              <span>
                {selectedSimType === 1
                  ? "Descuento estimado por quincena"
                  : "Capital total"}
              </span>
              <strong>${seleccionado.capital.toFixed(2)}</strong>
            </div>
            <div className="ticket-row telefono-input-row">
              <label htmlFor="telefono" className="telefono-label">
                Teléfono celular:
              </label>
              <input
                id="telefono"
                type="tel"
                name="telefono"
                placeholder="Ej. 5551234567"
                pattern="[0-9]{10}"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="telefono-input"
              />
            </div>
          </div>

          <div className="ticket-footer">
            <button
              className={`btn-ticket ${sinCreditoDisponible ? "btn-disabled" : "btn-activo"}`}
              type="button"
              onClick={handleSolicitarPrestamo}
              disabled={sinCreditoDisponible}
            >
              {sinCreditoDisponible
                ? "No puedes solicitar el préstamo"
                : "Solicitar préstamo"}
            </button>

            {sinCreditoDisponible && (
              <p className="mensaje-aviso">
                No tienes <strong>límite de descuento disponible</strong> para solicitar este préstamo.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
