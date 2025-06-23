import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ContractsAdminTableSkeleton.css";

export default function ContractsAdminTableSkeleton() {
  const columnas = 8;

  return (
    <div className="contracts-admin-table">
      <table className="tabla-contratos">
        <thead>
          <tr>
            {["ID Usuario", "Financiera", "Nombre", "Estatus", "Servicio", "Plazos", "Descuento", "Monto"].map(
              (titulo, idx) => (
                <th key={idx}>
                  <Skeleton height={16} width={`${titulo.length * 8 + 40}px`} />
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: columnas }).map((_, j) => (
                <td key={j}>
                  {j === 3 || j === 4 ? (
                    <Skeleton height={24} width={60} borderRadius={12} />
                  ) : (
                    <Skeleton height={14} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
