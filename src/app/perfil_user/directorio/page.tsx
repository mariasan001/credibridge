"use client";
import { useEffect, useState } from "react";
import { getLenderDirectory } from "./services/lenderDirectoryService";
import { LenderDirectoryResponse } from "./models/LenderDirectoryModel";
import { PageLayout } from "@/components/PageLayout";
import "./DirectorioPage.css";

// Íconos de lucide-react
import {
  Shield,
  Banknote,
  Briefcase,
} from "lucide-react";

export default function DirectorioPage() {
  const [lendersGrouped, setLendersGrouped] = useState<LenderDirectoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLenderDirectory()
      .then(setLendersGrouped)
      .catch(() => setLendersGrouped([]))
      .finally(() => setLoading(false));
  }, []);

  const renderIcon = (desc: string) => {
    const lower = desc.toLowerCase();
    if (lower.includes("seguro")) return <Shield size={26} strokeWidth={1.75} />;
    if (lower.includes("préstamo") || lower.includes("credito") || lower.includes("crédito"))
      return <Banknote size={26} strokeWidth={1.75} />;
    return <Briefcase size={26} strokeWidth={1.75} />;
  };

  return (
    <PageLayout>
      <div className="directorio-container">
        <h2>Directorio de Financieras</h2>
        <p>Aqui podras encontrar la lista de las financieras  que estan asociadad </p>

        {loading && <p>Cargando directorio...</p>}

        {!loading &&
          lendersGrouped.map((group) => (
            <div key={group.serviceTypeId} className="grupo-servicio">
              <h3>{group.serviceTypeDesc}</h3>

              <div className="servicios-lista">
                {group.services.map((item, idx) => (
                  <div key={idx} className="tarjeta-financiera-min">
                    <div className="icono-servicio">
                      {renderIcon(item.serviceDesc)}
                    </div>

                    <div className="info-servicio">
                      <h4>{item.lender.lenderName}</h4>
                      <div className="info-row">
                        <p><strong>Correo:</strong> {item.lender.lenderEmail}</p>
                        <p><strong>Teléfono:</strong> {item.lender.lenderPhone}</p>
                        <p><strong>Tasa:</strong> {item.rate * 100}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </PageLayout>
  );
}
