"use client";

import { useState } from "react";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import { FiltersBar } from "./FiltersBar";
import { ContractsTable } from "./ContractsTable";
import { AssignModal } from "./AssignModal";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { useContracts } from "../hook/useContracts";
import { useAuth } from "@/context/AuthContext";
import { ModalProspecto } from "./ModalProspecto";
import { Contract } from "../models/Contract";
import ProspectosSkeleton from "../ProspectosSkeleton"; // 👈 Skeleton importado

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
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const handleEjecutivoStatusClick = (contract: Contract) => {
    setContractToUpdate(contract);
    setChangeModalVisible(true);
  };

  const handleProspectoClick = (contract: Contract) => {
    setSelectedContract(contract);
  };

  const contratosFiltradosFinal = isEjecutivo
    ? contratosFiltrados.filter((c) => c.modificatedUser === user?.userId)
    : contratosFiltrados;

  return (
    <div className="contracts-container">
      {loading ? (
        <ProspectosSkeleton /> 
      ) : (
        <>
          <FiltersBar
            filtros={filtros}
            setFiltros={setFiltros}
            setPage={setPage}
          />

          <ContractsTable
            contracts={contratosFiltradosFinal}
            onChangeStatus={cambiarEstatus}
            isEjecutivo={isEjecutivo}
            onClickEjecutivoStatus={handleEjecutivoStatusClick}
            onClickProspecto={handleProspectoClick}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <AssignModal
        visible={modalVisible}
        usuariosAsignables={usuariosAsignables}
        usuarioSeleccionado={usuarioSeleccionado}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        onClose={() => setModalVisible(false)}
        onAssign={asignarContrato}
      />

      {isEjecutivo && (
        <ChangeStatusModal
          visible={changeModalVisible}
          onClose={() => setChangeModalVisible(false)}
          onChangeStatus={confirmarCambioEstatus}
          statusList={estatusDisponibles}
        />
      )}

      <ModalProspecto
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
        onModificar={(c) => console.log("Modificar préstamo", c)}
      />
    </div>
  );
};
