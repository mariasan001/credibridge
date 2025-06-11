import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Contract } from "../models/Contract";
import { ContractStatus } from "../models/ContractStatus";
import { useAuth } from "@/context/AuthContext";
import { getVisibleStatusesByRole } from "../utils/statusHelpers";
import {
  fetchContracts,
  updateContractStatus,
} from "../services/contractService";
import {
  assignContract,
  fetchAssignableUsers,
} from "../services/assignService.";
import { fetchAllStatuses } from "../services/contract-status";

export function useContracts() {
  const { user } = useAuth();
  const roleId = user?.roles?.[0]?.id ?? 0;
  const isEjecutivo = roleId === 5;

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [usuariosAsignables, setUsuariosAsignables] = useState<string[]>([]);
  const [contractToAssign, setContractToAssign] = useState<number | null>(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  const [estatusDisponibles, setEstatusDisponibles] = useState<ContractStatus[]>([]);
  const [changeModalVisible, setChangeModalVisible] = useState(false);
  const [contractToUpdate, setContractToUpdate] = useState<Contract | null>(null);

  const [filtros, setFiltros] = useState({
    userId: "",
    fechaRango: "",
    servicio: "",
    status: "",
  });

  const visibleStatusIds = getVisibleStatusesByRole(roleId);

  const loadContracts = async () => {
    if (visibleStatusIds.length === 0) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetchContracts(visibleStatusIds, page);
      setContracts(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error cargando contratos:", err);
      toast.error("Error al cargar contratos.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContracts();
  }, [page, roleId]);

  useEffect(() => {
    if (isEjecutivo) {
      fetchAllStatuses()
        .then(res => {
          const filtrados = res.data.filter(e => e.id !== 1); // excluir RESERVA
          setEstatusDisponibles(filtrados);
        })
        .catch(() => {
          toast.error("No se pudieron cargar los estatus disponibles.");
        });
    }
  }, [isEjecutivo]);

  const cambiarEstatus = async (contract: Contract) => {
    try {
      if (isEjecutivo) {
        setContractToUpdate(contract);
        setChangeModalVisible(true);
        return;
      }

      if (contract.contractStatusDesc.toLowerCase() === "reserva") {
        await updateContractStatus(contract.id, 4);
        setContracts((prev) =>
          prev.map((c) =>
            c.id === contract.id
              ? { ...c, contractStatusDesc: "PENDIENTE DE DOCUMENTACION" }
              : c
          )
        );
        toast.success("Contrato actualizado a 'Pendiente de documentación'");
      } else if (
        contract.contractStatusDesc.toLowerCase() ===
        "pendiente de documentacion"
      ) {
        const res = await fetchAssignableUsers();
        setUsuariosAsignables(res.data);
        setContractToAssign(contract.id);
        setModalVisible(true);
      }
    } catch (err) {
      console.error("Error cambiando estatus:", err);
      toast.error("Error al cambiar el estatus del contrato.");
    }
  };

  const confirmarCambioEstatus = async (newStatusId: number) => {
    if (!contractToUpdate) return;

    try {
      await updateContractStatus(contractToUpdate.id, newStatusId);

      toast.success("Estatus actualizado correctamente");
      setChangeModalVisible(false);
      setContractToUpdate(null);

      setTimeout(() => {
        loadContracts();
      }, 1000);
    } catch (err) {
      toast.error("Error al actualizar estatus");
      console.error(err);
    }
  };

  const asignarContrato = async () => {
    if (!contractToAssign || !usuarioSeleccionado) return;
    try {
      await assignContract(contractToAssign, usuarioSeleccionado);
      await updateContractStatus(contractToAssign, 5);

      setContracts((prev) =>
        prev.map((c) =>
          c.id === contractToAssign
            ? { ...c, contractStatusDesc: "EN PROCESO" }
            : c
        )
      );

      setModalVisible(false);
      setUsuarioSeleccionado("");
      setContractToAssign(null);

      toast.success("Contrato asignado correctamente.");

      setTimeout(() => {
        loadContracts();
      }, 1500);
    } catch (err) {
      console.error("Error asignando contrato:", err);
      toast.error("Ocurrió un error al asignar el contrato.");
    }
  };

  const contratosFiltrados = contracts.filter((c) => {
    const f1 =
      filtros.userId === "" ||
      c.userId.toLowerCase().includes(filtros.userId.toLowerCase());
    const f2 =
      filtros.servicio === "" ||
      c.typeService.toLowerCase().includes(filtros.servicio);
    const f3 =
      filtros.status === "" ||
      c.contractStatusDesc.toLowerCase().includes(filtros.status);
    const f4 =
      filtros.fechaRango === "" ||
      (() => {
        const fecha = new Date(c.createdAt);
        const hoy = new Date();
        switch (filtros.fechaRango) {
          case "hoy":
            return fecha.toDateString() === hoy.toDateString();
          case "semana": {
            const i = new Date(hoy);
            i.setDate(hoy.getDate() - hoy.getDay());
            const f = new Date(i);
            f.setDate(i.getDate() + 6);
            return fecha >= i && fecha <= f;
          }
          case "mes":
            return (
              fecha.getMonth() === hoy.getMonth() &&
              fecha.getFullYear() === hoy.getFullYear()
            );
          case "trimestre": {
            const m = hoy.getMonth();
            const t = Math.floor(m / 3);
            const i = new Date(hoy.getFullYear(), t * 3, 1);
            const f = new Date(hoy.getFullYear(), t * 3 + 3, 0);
            return fecha >= i && fecha <= f;
          }
          case "año":
            return fecha.getFullYear() === hoy.getFullYear();
          default:
            return true;
        }
      })();

    return f1 && f2 && f3 && f4;
  });

  return {
    contracts,
    contratosFiltrados,
    loading,
    error,
    page,
    totalPages,
    setPage,
    filtros,
    setFiltros,
    modalVisible,
    setModalVisible,
    usuariosAsignables,
    usuarioSeleccionado,
    setUsuarioSeleccionado,
    cambiarEstatus,
    asignarContrato,
    // NUEVOS
    isEjecutivo,
    estatusDisponibles,
    changeModalVisible,
    setChangeModalVisible,
    contractToUpdate,
    confirmarCambioEstatus,
    setContractToUpdate, // 👈 Asegúrate de incluirl

  };
}
