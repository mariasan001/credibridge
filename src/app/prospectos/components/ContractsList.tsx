"use client";

import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import { FiltersBar } from "./FiltersBar";
import { ContractsTable } from "./ContractsTable";
import { AssignModal } from "./AssignModal";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { useContracts } from "../hook/useContracts";
import { useAuth } from "@/context/AuthContext";

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
    isEjecutivo,
    estatusDisponibles,
    changeModalVisible,
    setChangeModalVisible,
    contractToUpdate,
    confirmarCambioEstatus,
    setContractToUpdate,
  } = useContracts();

  const { user } = useAuth();

  // ✅ Filtrar solo contratos asignados al ejecutivo actual
  const contratosFiltradosFinal = isEjecutivo
    ? contratosFiltrados.filter((c) => c.modificatedUser === user?.userId)
    : contratosFiltrados;

  const handleEjecutivoStatusClick = (contract: any) => {
    setContractToUpdate(contract);
    setChangeModalVisible(true);
  };

  return (
    <div className="contracts-container">
      <FiltersBar filtros={filtros} setFiltros={setFiltros} setPage={setPage} />

      <ContractsTable
        contracts={contratosFiltradosFinal}
        onChangeStatus={cambiarEstatus}
        isEjecutivo={isEjecutivo}
        onClickEjecutivoStatus={handleEjecutivoStatusClick}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Modal para asignación (asesores) */}
      <AssignModal
        visible={modalVisible}
        usuariosAsignables={usuariosAsignables}
        usuarioSeleccionado={usuarioSeleccionado}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        onClose={() => setModalVisible(false)}
        onAssign={asignarContrato}
      />

      {/* Modal para cambiar estatus (ejecutivos) */}
      {isEjecutivo && (
        <ChangeStatusModal
          visible={changeModalVisible}
          onClose={() => setChangeModalVisible(false)}
          onChangeStatus={confirmarCambioEstatus}
          statusList={estatusDisponibles}
        />
      )}
    </div>
  );
};
