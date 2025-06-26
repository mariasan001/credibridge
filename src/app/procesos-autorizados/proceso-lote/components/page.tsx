import { PageLayout } from "@/components/PageLayout";
import PayrollUploader from "./components/PayrollUploader";
import PayrollList from "./components/PayrollList";
import { CarteraHeader } from "./components/CarteraHeader";

export default function PayrollUploadPage() {
    return (
        <PageLayout>
           <CarteraHeader/>
            <PayrollUploader />
            <PayrollList />
        </PageLayout>

    );
}
