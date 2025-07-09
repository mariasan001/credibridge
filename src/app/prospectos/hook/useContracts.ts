import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Contract } from "../models/Contract";
import { ContractStatus } from "../models/ContractStatus";

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
import { useAuth } from "@/hooks/useAuth";

// 🧠 Opcional: mover a archivo externo para reutilizar
const filtrarPorFecha = (fecha: Date, rango: string) => {
  const hoy = new Date();
  switch (rango) {
    case "hoy":
      return fecha.toDateString() === hoy.toDateString();
    case "semana": {
      const inicio = new Date(hoy);
      inicio.setDate(hoy.getDate() - hoy.getDay());
      const fin = new Date(inicio);
      fin.setDate(inicio.getDate() + 6);
      return fecha >= inicio && fecha <= fin;
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
};

export function useContracts() {
  const { user } = useAuth();
  const roleId = user?.roles?.[0]?.id ?? 0;
  const isEjecutivo = roleId === 5;

  // 📦 Estados principales
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // 📦 Estados para asignación
  const [modalVisible, setModalVisible] = useState(false);
  const [usuariosAsignables, setUsuariosAsignables] = useState<string[]>([]);
  const [contractToAssign, setContractToAssign] = useState<number | null>(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  // 📦 Estados para cambio de estatus
  const [estatusDisponibles, setEstatusDisponibles] = useState<
    ContractStatus[]
  >([]);
  const [changeModalVisible, setChangeModalVisible] = useState(false);
  const [contractToUpdate, setContractToUpdate] = useState<Contract | null>(
    null
  );

  // 📦 Filtros
  const [filtros, setFiltros] = useState({
    userId: "",
    fechaRango: "",
    servicio: "",
    status: "",
  });

  const visibleStatusIds = getVisibleStatusesByRole(roleId);

  // 🔄 Carga contratos
  const loadContracts = async () => {
    if (visibleStatusIds.length === 0) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetchContracts(visibleStatusIds, page, pageSize);
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
        .then((res) => {
          setEstatusDisponibles(res.data.filter((e) => e.id !== 1));
        })
        .catch(() => {
          toast.error("No se pudieron cargar los estatus disponibles.");
        });
    }
  }, [isEjecutivo]);

  // ✅ Cambia estatus
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

  // ✅ Confirma cambio de estatus (modal ejecutivo)
  const confirmarCambioEstatus = async (newStatusId: number) => {
    if (!contractToUpdate) return;

    try {
      await updateContractStatus(contractToUpdate.id, newStatusId);
      toast.success("Estatus actualizado correctamente");
      setChangeModalVisible(false);
      setContractToUpdate(null);
      loadContracts();
    } catch (err) {
      toast.error("Error al actualizar estatus");
      console.error(err);
    }
  };

  // ✅ Asigna contrato (actualizado con recarga real)
  const asignarContrato = async () => {
    if (!contractToAssign || !usuarioSeleccionado) return;
    try {
      await assignContract(contractToAssign, usuarioSeleccionado);
      await updateContractStatus(contractToAssign, 5);

      // 🔄 Recargar contratos desde backend
      await loadContracts(); // 👈 Aquí el cambio real

      // 🧹 Limpiar y cerrar modal
      setModalVisible(false);
      setUsuarioSeleccionado("");
      setContractToAssign(null);

      toast.success("Contrato asignado correctamente.");
    } catch (err) {
      console.error("Error asignando contrato:", err);
      toast.error("Ocurrió un error al asignar el contrato.");
    }
  };

  // 🔍 Aplica filtros con `useMemo` (no se recalcula innecesariamente)
  const contratosFiltrados = useMemo(() => {
    return contracts.filter((c) => {
      const f1 =
        !filtros.userId ||
        c.userId.toLowerCase().includes(filtros.userId.toLowerCase());
      const f2 =
        !filtros.servicio ||
        c.typeService.toLowerCase().includes(filtros.servicio);
      const f3 =
        !filtros.status ||
        c.contractStatusDesc.toLowerCase().includes(filtros.status);
      const f4 =
        !filtros.fechaRango ||
        filtrarPorFecha(new Date(c.createdAt), filtros.fechaRango);

      return f1 && f2 && f3 && f4;
    });
  }, [contracts, filtros]);

  // 🎯 Retornamos todo listo
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
    isEjecutivo,
    estatusDisponibles,
    changeModalVisible,
    setChangeModalVisible,
    contractToUpdate,
    confirmarCambioEstatus,
    setContractToUpdate,
  };
}
