import { PageLayout } from "@/components/PageLayout"
import { SimuladorCreditoForm } from "./components/formularioSolicitud"

export default function SimulacionPage() {
  return (
    <PageLayout>
      <h2>Pagina de simulacion </h2>
      <p>aqui podras hacer la siluacion de tu credito y si te comvien podras solicitarlo son la finaicera de tu prferencia </p>
      <br></br>
   
      <br></br>
      <br></br>
      <SimuladorCreditoForm />
    </PageLayout>
  )
}
