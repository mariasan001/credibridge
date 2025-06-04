import { PageLayout } from "@/components/PageLayout";
import { SimuladorCreditoForm } from "./components/formularioSolicitud";
import "./syles.css"; // <-- crea este archivo para los estilos

export default function SimulacionPage() {
  return (
    <PageLayout>
      <div className="simulacion-container">
        <div className="simulacion-header">
          <h2>Simulador de crédito</h2>
          <p>
            Aquí podrás simular tu crédito y, si te conviene, podrás solicitarlo con la
            financiera de tu preferencia.
          </p>
        </div>

        <div className="simulacion-form-wrapper">
          <SimuladorCreditoForm />
        </div>
      </div>
    </PageLayout>
  );
}
