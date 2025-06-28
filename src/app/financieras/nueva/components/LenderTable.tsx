'use client';
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Lender } from "../types/lender";
import styles from "./LenderTable.module.css";
import { deleteLender, getLenders } from "../services/lenderService";

interface Props {
  onEdit: (lender: Lender) => void;
}

export const LenderTable = ({ onEdit }: Props) => {
  const [lenders, setLenders] = useState<Lender[]>([]);

  const load = async () => {
    const data = await getLenders();
    setLenders(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar este lender?")) {
      await deleteLender(id);
      load();
    }
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles["tabla-lenders"]}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lenders.map(l => (
            <tr key={l.id}>
              <td className="bold">{l.lenderName}</td>
              <td>{l.lenderEmail}</td>
              <td>{l.lenderPhone}</td>
              <td>
                <span className={styles["icon-action"]} onClick={() => onEdit(l)} title="Editar">
                  <Pencil size={16} />
                </span>
                <span className={`${styles["icon-action"]} ${styles.red}`} onClick={() => handleDelete(l.id)} title="Eliminar">
                  <Trash2 size={16} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
