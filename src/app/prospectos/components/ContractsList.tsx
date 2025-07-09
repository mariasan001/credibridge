"use client";

import { useState, useEffect } from "react";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import { FiltersBar } from "./FiltersBar";
import { ContractsTable } from "./ContractsTable";
import { AssignModal } from "./AssignModal";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { useContracts } from "../hook/useContracts";
import { useAuth } from "@/hooks/useAuth";
import { ModalProspecto } from "./ModalProspecto";
import { Contract } from "../models/Contract";
import ProspectosSkeleton from "../ProspectosSkeleton";

let showedContractsSkeleton = false; // 🧠 se guarda en memoria local de la sesión

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
  const [showSkeleton, setShowSkeleton] = useState(!showedContractsSkeleton);

  useEffect(() => {
    if (showSkeleton && loading) {
      const timeout = setTimeout(() => {
        showedContractsSkeleton = true;
        setShowSkeleton(false);
      }, 1000); // ⏱️ Puedes ajustar el tiempo
      return () => clearTimeout(timeout);
    } else if (!loading) {
      setShowSkeleton(false);
    }
  }, [loading]);

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
      {loading && showSkeleton ? (
        <ProspectosSkeleton />
      ) : (
        <>
          <FiltersBar filtros={filtros} setFiltros={setFiltros} setPage={setPage} />

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
