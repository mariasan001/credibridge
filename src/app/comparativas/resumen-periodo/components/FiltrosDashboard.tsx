'use client';

import { useState, useEffect } from 'react';
import "./filtros-dashboard.css";
import { LenderServiceItem } from '@/app/perfil_user/directorio/models/LenderDirectoryModel';
import { getLenderDirectory } from '@/app/perfil_user/directorio/services/lenderDirectoryService';

interface Props {
  onFiltrar: (filtros: {
    startDateFrom: string;
    startDateTo: string;
    lenderId: number;
    contractStatusIds: number[];
  }) => void;
}

export function FiltrosDashboard({ onFiltrar }: Props) {
  const [startDateFrom, setStartDateFrom] = useState('2025-01-01');
  const [startDateTo, setStartDateTo] = useState('2025-12-31');
  const [lenderId, setLenderId] = useState<number | null>(null);
  const [lenders, setLenders] = useState<LenderServiceItem["lender"][]>([]);

  useEffect(() => {
    const loadLenders = async () => {
      try {
        const directory = await getLenderDirectory();

        // Extrae todos los lenders únicos activos
        const allLenders = directory.flatMap(d => d.services.map(s => s.lender));
        const lendersMap = new Map<number, typeof allLenders[0]>();
        allLenders.forEach(l => {
          if (l.active && !lendersMap.has(l.id)) {
            lendersMap.set(l.id, l);
          }
        });

        const uniqueLenders = Array.from(lendersMap.values());
        setLenders(uniqueLenders);

        if (uniqueLenders.length > 0) {
          setLenderId(uniqueLenders[0].id);
        }

      } catch (error) {
        console.error("Error al cargar lenders:", error);
      }
    };

    loadLenders();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lenderId !== null) {
      onFiltrar({
        startDateFrom,
        startDateTo,
        lenderId,
        contractStatusIds: [1, 2, 3, 4, 5, 6], // Puedes hacerlo dinámico si luego quieres filtrar por status
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="filtros-form">
      <div className="campo">
        <label>Desde:</label>
        <input
          type="date"
          value={startDateFrom}
          onChange={(e) => setStartDateFrom(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Hasta:</label>
        <input
          type="date"
          value={startDateTo}
          onChange={(e) => setStartDateTo(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Financiera:</label>
        <select
          value={lenderId ?? ''}
          onChange={(e) => setLenderId(Number(e.target.value))}
        >
          {lenders.map((lender) => (
            <option key={lender.id} value={lender.id}>
              {lender.lenderName}
            </option>
          ))}
        </select>
      </div>
      <div className="boton-container">
        <button type="submit" className="boton-buscar">
          Buscar
        </button>
      </div>
    </form>
  );
}
