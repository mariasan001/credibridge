// components/ContractsSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ContractRow.css"; // Usa tus estilos para alinear bien los <td>

export function ContractsSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <table className="contracts-table">
      <thead>
        <tr>
          <th>Num. Servidor</th>
          <th>Nombre</th>
          <th>RFC</th>
          <th>Monto</th>
          <th>Estatus</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((_, index) => (
          <tr key={index}>
            <td><Skeleton width={100} /></td>
            <td><Skeleton width={150} /></td>
            <td><Skeleton width={120} /></td>
            <td><Skeleton width={100} /></td>
            <td><Skeleton width={160} height={20} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
