import { PageLayout } from "@/components/PageLayout";
import PayrollUploader from "./components/PayrollUploader";
import PayrollList from "./components/PayrollList";

export default function PayrollUploadPage() {
    return (
        <PageLayout>
           
            <PayrollUploader />
            <PayrollList />
        </PageLayout>

    );
}
