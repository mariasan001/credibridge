'use client';

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Lender } from "../types/lender";
import styles from "./LenderTable.module.css";
import { deleteLender, getLenders } from "../services/lenderService";
import { Pagination } from "@/app/cartera-clientes/components/Pagination";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  onEdit: (lender: Lender) => void;
}

const ITEMS_PER_PAGE = 10;

export const LenderTable = ({ onEdit }: Props) => {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const load = async () => {
    try {
      const data = await getLenders();
      setLenders(data);
    } catch (error) {
      toast.error("Error al cargar lenders");
      console.error("Error al cargar lenders:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

const handleDelete = async (id: number) => {
  try {
    console.log("Intentando eliminar lender con ID:", id);
    await deleteLender(id);
    toast.success("Lender eliminado correctamente");
    await load();
  } catch (error: any) {
    const backendMsg =
      error?.response?.data?.message || error?.message || "Error desconocido";

    // Traducción de errores conocidos
    if (backendMsg.includes("violates foreign key") || backendMsg.includes("llave foránea")) {
      toast.error("No se puede eliminar: el lender tiene contratos relacionados.");
    } else {
      toast.error(`Error al eliminar el lender: ${backendMsg}`);
    }

    console.error("Error al eliminar lender:", backendMsg);
  }
};


  const totalPages = Math.ceil(lenders.length / ITEMS_PER_PAGE);
  const currentItems = lenders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((l) => (
            <tr key={l.id}>
              <td>{l.lenderName}</td>
              <td>{l.lenderEmail}</td>
              <td>{l.lenderPhone}</td>
              <td>
                <span
                  className={styles["action-icon"]}
                  onClick={() => onEdit(l)}
                  title="Editar"
                >
                  <Pencil size={16} />
                </span>
                <span
                  className={`${styles["action-icon"]} ${styles.delete}`}
                  onClick={() => handleDelete(l.id)}
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {lenders.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
};
