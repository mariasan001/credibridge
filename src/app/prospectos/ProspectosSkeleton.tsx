import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProspectosSkeleton.css"; // o el CSS necesario para mantener estilo de tabla

export default function ProspectosSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <div className="contracts-container">
      <div style={{ marginBottom: "1rem" }}>
        <Skeleton height={40} width="100%" />
      </div>

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
          {rows.map((_, i) => (
            <tr key={i}>
              <td><Skeleton width={100} /></td>
              <td><Skeleton width={150} /></td>
              <td><Skeleton width={120} /></td>
              <td><Skeleton width={100} /></td>
              <td><Skeleton width={160} height={20} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
        <Skeleton width={200} height={30} />
      </div>
    </div>
  );
}
