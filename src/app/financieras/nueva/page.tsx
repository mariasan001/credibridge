// app/admin/lenders/page.tsx
'use client';
import { useState } from "react";

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
            <div>
    
                <div>
                    <LenderTable key={refresh.toString()} onEdit={setEditing} />
                </div>
            </div>

        </PageLayout>

    );
}
