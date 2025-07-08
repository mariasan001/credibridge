// components/DebtFilters.tsx

import React from "react";
import "./DebtFiltersRow.css";
type Filtros = {
  id: string;
  contractId: string;
  beneficiaryName: string;
  beneficiaryRfc: string;
  status: string;
};

type Props = {
  filtros: Filtros;
  setFiltros: React.Dispatch<React.SetStateAction<Filtros>>;
};

const DebtFilters: React.FC<Props> = ({ filtros, setFiltros }) => {
  return (
    <div className="debt-filters-bar">
      <div className="filter-group">
        <label htmlFor="filtro-id">ID</label>
        <input
          id="filtro-id"
          type="text"
          value={filtros.id}
          onChange={(e) => setFiltros({ ...filtros, id: e.target.value })}
          placeholder="Buscar ID"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filtro-contrato">Contrato</label>
        <input
          id="filtro-contrato"
          type="text"
          value={filtros.contractId}
          onChange={(e) => setFiltros({ ...filtros, contractId: e.target.value })}
          placeholder="Buscar contrato"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filtro-nombre">Nombre</label>
        <input
          id="filtro-nombre"
          type="text"
          value={filtros.beneficiaryName}
          onChange={(e) => setFiltros({ ...filtros, beneficiaryName: e.target.value })}
          placeholder="Buscar nombre"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filtro-rfc">RFC</label>
        <input
          id="filtro-rfc"
          type="text"
          value={filtros.beneficiaryRfc}
          onChange={(e) => setFiltros({ ...filtros, beneficiaryRfc: e.target.value })}
          placeholder="Buscar RFC"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="filtro-status">Estatus</label>
        <select
          id="filtro-status"
          value={filtros.status}
          onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="BLOQUEADO">Bloqueado</option>
          <option value="LIBERADO">Liberado</option>
        </select>
      </div>
    </div>
  );
};

export default DebtFilters;
