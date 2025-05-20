"use client";

import { useAuth } from "@/context/AuthContext";
import {
  User,
  Building2,
  MapPin,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import "./perfil.css";
import { JSX, useState } from "react";
import { updateUserContact } from "../services/userService";

const PerfilSectionCard = ({
  icon,
  titulo,
  subtitulo,
  children,
}: {
  icon: JSX.Element;
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
}) => (
  <div className="perfil-section-card">
    <div className="perfil-section-header">
      <div className="perfil-icon">{icon}</div>
      <div>
        <h3>{titulo}</h3>
        {subtitulo && <p className="perfil-sub">{subtitulo}</p>}
      </div>
    </div>
    <div className="perfil-datos">{children}</div>
  </div>
);

export const PerfilUsuarioCard = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  if (!user) return null;

  const handleToggleEdit = async () => {
    if (editMode) {
      try {
        console.log("Guardar cambios:", { email, phone });
        await updateUserContact(user.userId, { email, phone });
  
        // Opcional: toast de éxito
        // toast.success("Contacto actualizado correctamente");
  
        // Opcional: reconsulta con getUserById si tienes setUser en el contexto
        // const updatedUser = await getUserById(user.userId);
        // setUser(updatedUser);
  
      } catch (error) {
        console.error("Error al actualizar el contacto:", error);
        // toast.error("Error al actualizar el contacto");
      }
    }
    setEditMode(!editMode);
  };

  return (
    <div className="perfil-page-container">
      <div className="perfil-top-bar">
      <div className="perfil-titular">
          <h2>Perfil del Usuario</h2>
          <p>Consulta y administra tu información personal</p>
          
        </div>
        <button className="perfil-btn" onClick={handleToggleEdit}>
          {editMode ? "Guardar" : "Actualizar"}
        </button>
       
      </div>
      {/* Primera fila */}
      <div className="perfil-section-grid">
        <PerfilSectionCard
          icon={<User size={20} />}
          titulo="Datos Personales"
          subtitulo="Información básica del usuario"
        >
          <div className="perfil-item"><span>ID Usuario:</span><strong>{user.userId}</strong></div>
          <div className="perfil-item"><span>Nombre:</span><strong>{user.name}</strong></div>
          <div className="perfil-item"><span>CURP:</span><strong>{user.curp}</strong></div>
          <div className="perfil-item"><span>RFC:</span><strong>{user.rfc}</strong></div>

          <div className="perfil-item" title={email}>
            <span>Correo:</span>
            {editMode ? (
              <input
                className="perfil-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <strong className="ellipsis-text">{email || "No disponible"}</strong>
            )}
          </div>

          <div className="perfil-item" title={phone}>
            <span>Teléfono:</span>
            {editMode ? (
              <input
                className="perfil-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <strong className="ellipsis-text">{phone || "No disponible"}</strong>
            )}
          </div>

          <div className="perfil-item"><span>Fecha de Nacimiento:</span><strong>{user.dateOfBirth ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Género:</span><strong>{user.gender ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Estado Civil:</span><strong>{user.maritalStatus ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Estado del Usuario:</span><strong>{user.userStatus?.desc ?? "No disponible"}</strong></div>
        </PerfilSectionCard>

        <PerfilSectionCard
          icon={<Building2 size={20} />}
          titulo="Información Laboral"
          subtitulo="Detalles del puesto asignado"
        >
          <div className="perfil-item"><span>Plaza:</span><strong>{user.idPlaza}</strong></div>
          <div className="perfil-item"><span>ID SS:</span><strong>{user.idSs}</strong></div>
          <div className="perfil-item"><span>Fecha de Ingreso:</span><strong>{user.occupationDate}</strong></div>
          <div className="perfil-item"><span>Unidad de Trabajo:</span><strong>{user.workUnit?.desc ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Código de Puesto:</span><strong>{user.jobCode?.desc ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Estatus de Puesto:</span><strong>{user.positionStatus?.desc ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Banco:</span><strong>{user.bank?.desc ?? "No disponible"}</strong></div>
        </PerfilSectionCard>
      </div>

      {/* Segunda fila */}
      <div className="perfil-section-grid">
        <PerfilSectionCard
          icon={<MapPin size={20} />}
          titulo="Dirección"
          subtitulo="Ubicación registrada del usuario"
        >
          <div className="perfil-item"><span>Tipo de Dirección:</span><strong>{user.addressType ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Calle:</span><strong>{user.street ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Número:</span><strong>{user.addressNumber ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Colonia:</span><strong>{user.addressDistrict ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Ciudad:</span><strong>{user.addressCity ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Estado:</span><strong>{user.state ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>País:</span><strong>{user.country ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Dirección completa:</span><strong>{user.address ?? "No disponible"}</strong></div>
        </PerfilSectionCard>

        <PerfilSectionCard
          icon={<Banknote size={20} />}
          titulo="Financiera Asignada"
          subtitulo="Institución financiera vinculada"
        >
          <div className="perfil-item"><span>Nombre:</span><strong>{user.lender?.lenderName ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Descripción:</span><strong>{user.lender?.lenderDesc ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Correo:</span><strong>{user.lender?.lenderEmail ?? "No disponible"}</strong></div>
          <div className="perfil-item"><span>Teléfono:</span><strong>{user.lender?.lenderPhone ?? "No disponible"}</strong></div>
        </PerfilSectionCard>
      </div>

      {/* Última fila */}
    
    </div>
  );
};
