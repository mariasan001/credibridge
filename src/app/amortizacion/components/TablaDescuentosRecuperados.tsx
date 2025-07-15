import { useState } from "react";
import "./TablaDescuentosRecuperados.css";
import { ActualPayment } from "../model/amortization_model";
import { CashPaymentModal } from "./CashPaymentModal";
import { CashPaymentDetailsModal } from "./CashPaymentDetailsModal";
import { Pencil, Eye, Download } from "lucide-react";

interface Props {
  descuentos: ActualPayment[];
}

export default function TablaDescuentosRecuperados({ descuentos }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCreditId, setSelectedCreditId] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<ActualPayment | null>(null);

  const handleOpenModal = (creditId: number) => {
    setSelectedCreditId(creditId);
    setModalOpen(true);
  };

  const handleViewDetails = (desc: ActualPayment) => {
    setSelectedDetail(desc);
  };

  return (
    <div className="tabla-scroll">
      <div className="tabla-descuentos-wrapper">
        <div className="tabla-descuentos-header">
          <h4>Descuentos Recuperados</h4>
          <button title="Descargar" className="icon-btn-descargar">
            <Download size={16} />
          </button>
        </div>

        <div className="tabla-descuentos-scroll">
          <table className="tabla-descuentos">
            <thead>
              <tr>
                <th>Nomina</th>
                <th>Periodo</th>
                <th>Clave</th>
                <th>Estatus</th>
                <th>Valor desc</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {descuentos.map((desc, index) => (
                <tr key={`${desc.creditId}-${index}`}>
                  <td>Gobierno Estado de México</td>
                  <td>{desc.period}</td>
                  <td>{desc.creditId}</td>
                  <td>{getEstatus(desc)}</td>
                  <td>
                    {desc.paymentAmount > 0
                      ? `$${desc.paymentAmount.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}`
                      : "-"}
                  </td>
                  <td className="acciones-directas">
                    <button
                      className="icon-btn"
                      title="Modificar pago"
                      onClick={() => handleOpenModal(desc.id)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="icon-btn"
                      title="Ver detalles"
                      onClick={() => handleViewDetails(desc)}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && selectedCreditId !== null && (
        <CashPaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          creditId={selectedCreditId}
        />
      )}

      {selectedDetail && (
        <CashPaymentDetailsModal
          payment={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      )}

    </div>
  );
}

function getEstatus(desc: ActualPayment): string {
  switch (desc.paymentStatus) {
    case 0:
      return "No fue cubierto";
    case 1:
      return "Cubierto";
    case 2:
      return "Excedente";
    default:
      return "Desconocido";
  }
}