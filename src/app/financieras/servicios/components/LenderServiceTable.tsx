import React from "react";
import styles from "./LenderServiceTable.module.css";
import { LenderService } from "../types/lenderService";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  data: LenderService[];
  onEdit: (item: LenderService) => void;
  onDelete: (id: number) => void;
}

const LenderServiceTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Tasa (%)</th>
            <th>Valor Min/Max</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.lenderServiceDesc}</td>
              <td>{item.rate}</td>
              <td>
                {item.minValue} / {item.maxValue}
              </td>
              <td>{item.active ? "Sí" : "No"}</td>
              <td className={styles.actions}>
                <button onClick={() => onEdit(item)} className={styles.editBtn}>
                  <Pencil size={16} />
                  <span></span>
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className={styles.deleteBtn}
                >
                  <Trash2 size={16} />
                  <span></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LenderServiceTable;
