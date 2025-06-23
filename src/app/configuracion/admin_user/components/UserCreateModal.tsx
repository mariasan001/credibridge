"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import {
  createUser,
  fetchRoles,
  updateUser,
  UserPayload,
  Role
} from "../service/userService"
import "./UserCreateModal.css"

interface Props {
  onClose: () => void
  usuarioAEditar?: UserPayload | null
  modoEdicion?: boolean
}

export default function UserCreateModal({ onClose, usuarioAEditar, modoEdicion = false }: Props) {
  const [form, setForm] = useState<UserPayload>({
    usuario: "",
    name: "",
    firstname: "",
    secondName: "",
    email: "",
    password: "",
    roleId: 0
  })

  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    fetchRoles()
      .then(setRoles)
      .catch(() => toast.error("Error al cargar roles"))
  }, [])

  // Cargar datos si se está editando
  useEffect(() => {
    if (modoEdicion && usuarioAEditar) {
      setForm(usuarioAEditar)
    }
  }, [usuarioAEditar, modoEdicion])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: name === "roleId" ? parseInt(value) : value
    })
  }

  const handleSubmit = async () => {
    if (
      !form.usuario ||
      !form.name ||
      !form.firstname ||
      !form.secondName ||
      !form.email ||
      (!modoEdicion && !form.password) || // password obligatorio solo al crear
      !form.roleId
    ) {
      toast.error("Todos los campos son obligatorios")
      return
    }

    console.log(modoEdicion ? "✏️ Editando usuario:" : "📦 Creando usuario:", form)

    try {
      if (modoEdicion) {
        await updateUser(form)
        toast.success("✅ Usuario actualizado correctamente")
      } else {
        await createUser(form)
        toast.success("✅ Usuario creado correctamente")
      }
      onClose()
    } catch (err: any) {
      console.error("❌ Error al guardar usuario:", err)
      toast.error(err.response?.data?.message || "Error inesperado")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{modoEdicion ? "Editar Usuario" : "Crear nuevo usuario"}</h3>
        <div className="form-group">
          <input name="usuario" placeholder="ID de Usuario" value={form.usuario} onChange={handleChange} disabled={modoEdicion} />
          <input name="name" placeholder="Nombre completo" value={form.name} onChange={handleChange} />
          <input name="firstname" placeholder="Primer nombre" value={form.firstname} onChange={handleChange} />
          <input name="secondName" placeholder="Segundo nombre" value={form.secondName} onChange={handleChange} />
          <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} />
          {!modoEdicion && (
            <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
          )}
          <select name="roleId" value={form.roleId} onChange={handleChange}>
            <option value={0}>Selecciona un rol</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.description}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="submit-btn" onClick={handleSubmit}>
            {modoEdicion ? "Guardar Cambios" : "Crear Usuario"}
          </button>
        </div>
      </div>
    </div>
  )
}
