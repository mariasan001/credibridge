// app/(tu-ruta)/LenderServicesPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { LenderService } from "./types/lenderService";
import LenderServiceForm from "./components/LenderServiceForm";
import LenderServiceTable from "./components/LenderServiceTable";
import {
    createLenderService,
    deleteLenderService,
    getLenderServices,
    updateLenderService
} from "./services/lenderService";
import { PageLayout } from "@/components/PageLayout";
import { CarteraHeader } from "./components/CarteraHeader";

const LenderServicesPage: React.FC = () => {
    const [lenderServices, setLenderServices] = useState<LenderService[]>([]);
    const [selected, setSelected] = useState<LenderService | null>(null);
    const [loading, setLoading] = useState(false);

    const cargarServicios = async () => {
        setLoading(true);
        try {
            const data = await getLenderServices();
            setLenderServices(data);
        } catch (error) {
            console.error("Error al cargar servicios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarServicios();
    }, []);

    const handleSubmit = async (data: Partial<LenderService>) => {
        try {
            if (selected) {
                await updateLenderService(selected.id, data);
            } else {
                await createLenderService(data);
            }
            await cargarServicios();
            setSelected(null);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Seguro que quieres eliminar este servicio?")) return;
        try {
            await deleteLenderService(id);
            await cargarServicios();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    return (
        <PageLayout>
            <div>
            
               <CarteraHeader/>
                {loading ? (
                    <p>Cargando servicios...</p>
                ) : (
                    <LenderServiceTable
                        data={lenderServices}
                        onEdit={(item) => setSelected(item)}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </PageLayout>

    );
};

export default LenderServicesPage;
