"use client";

import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import { FiltersBar } from "./FiltersBar";
import { ContractsTable } from "./ContractsTable";
import { AssignModal } from "./AssignModal";
import { useContracts } from "../hook/useContracts";

export const ContractsList = () => {
  const {
    contracts,
    contratosFiltrados,
    loading,
    error,
    page,
    totalPages,
    filtros,
    setFiltros,
    setPage,
    modalVisible,
    usuariosAsignables,
    usuarioSeleccionado,
    setUsuarioSeleccionado,
    setModalVisible,
    cambiarEstatus,
    asignarContrato,
  } = useContracts();

  return (
    <div className="contracts-container">
      <FiltersBar filtros={filtros} setFiltros={setFiltros} setPage={setPage} />

      <ContractsTable contracts={contratosFiltrados} onChangeStatus={cambiarEstatus} />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <AssignModal
        visible={modalVisible}
        usuariosAsignables={usuariosAsignables}
        usuarioSeleccionado={usuarioSeleccionado}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        onClose={() => setModalVisible(false)}
        onAssign={asignarContrato}
      />
    </div>
  );
};
