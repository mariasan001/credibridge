import { PageLayout } from "@/components/PageLayout";
import PayrollUploader from "./components/PayrollUploader";
import PayrollList from "./components/PayrollList";

export default function PayrollUploadPage() {
    return (
        <PageLayout>
            <h1 className="text">Subir Archivo de Nómina</h1>
            <PayrollUploader />
            <PayrollList />
        </PageLayout>

    );
}
