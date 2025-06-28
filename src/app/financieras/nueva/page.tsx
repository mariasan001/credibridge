// app/admin/lenders/page.tsx
'use client';
import { useState } from "react";
import { LenderForm } from "./components/LenderForm";
import { LenderTable } from "./components/LenderTable";
import { Lender } from "./types/lender";
import { PageLayout } from "@/components/PageLayout";
import { CarteraHeader } from "./components/CarteraHeader";
export default function LendersPage() {
    const [editing, setEditing] = useState<Lender | null>(null);
    const [refresh, setRefresh] = useState(false);


    return (
        <PageLayout>
            <CarteraHeader></CarteraHeader>
            <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
    
                <div style={{ flex: 2 }}>
                    <LenderTable key={refresh.toString()} onEdit={setEditing} />
                </div>
            </div>

        </PageLayout>

    );
}
