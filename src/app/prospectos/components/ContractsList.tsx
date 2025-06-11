"use client";

import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import { FiltersBar } from "./FiltersBar";
import { ContractsTable } from "./ContractsTable";
import { AssignModal } from "./AssignModal";

import { useContracts } from "../hook/useContracts";
import { ChangeStatusModal } from "./ChangeStatusModal";

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
    // Nuevos para ejecutivo
    isEjecutivo,
    estatusDisponibles,
    changeModalVisible,
    setChangeModalVisible,
    contractToUpdate,
    confirmarCambioEstatus,
    setContractToUpdate, 
  } = useContracts();

  // ✅ función correcta para ejecutivos
  const handleEjecutivoStatusClick = (contract: any) => {
    setContractToUpdate(contract); // ✅ aquí se guarda el contrato actual
    setChangeModalVisible(true);  // ✅ se abre el modal
  };

  return (
    <div className="contracts-container">
      <FiltersBar filtros={filtros} setFiltros={setFiltros} setPage={setPage} />

      <ContractsTable
        contracts={contratosFiltrados}
        onChangeStatus={cambiarEstatus}
        isEjecutivo={isEjecutivo}
        onClickEjecutivoStatus={handleEjecutivoStatusClick}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Modal para asignar (asesores) */}
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
