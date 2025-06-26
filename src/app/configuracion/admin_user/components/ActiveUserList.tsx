"use client"

import { useEffect, useState } from "react"
import { User } from "../model/User"
import {
  fetchActiveUsers,
  deleteUser,
  UserPayload
} from "../service/userService"
import { Pencil, Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import UserCreateModal from "./UserCreateModal"
import "./ActiveUserTable.css"

export default function ActiveUserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<UserPayload | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    fetchActiveUsers()
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(() => {
        toast.error("Error al cargar usuarios")
        setLoading(false)
      })
  }, [])

  const handleDelete = async (userId: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este usuario?")
    if (!confirm) return

    try {
      await deleteUser(userId)
      setUsers(prev => prev.filter(u => u.userId !== userId))
      toast.success("Usuario eliminado correctamente")
    } catch (error) {
      console.error("Error al eliminar:", error)
      toast.error("No se pudo eliminar el usuario")
    }
  }

  const handleEdit = (user: User) => {
    const payload: UserPayload = {
      usuario: user.userId,
      name: user.name,
      firstname: "NombreGenérico",
      secondName: "ApellidoGenérico",
      email: user.email,
      password: "", // no se edita aquí
      roleId: user.roles[0]?.id || 1
    }
    setEditingUser(payload)
    setMostrarModal(true)
  }

  if (loading) return <p>Cargando usuarios...</p>

  return (
    <div className="user-table-container">
      <Toaster position="top-right" />
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>User ID</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.name}</td>
              <td>{user.userId}</td>
              <td>{user.email}</td>
              <td>
                <span className="role-pill">{user.roles[0]?.description || "—"}</span>
              </td>
              <td className="acciones">
                <button
                  className="edit-btn"
                  title="Editar"
                  onClick={() => handleEdit(user)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="delete-btn"
                  title="Eliminar"
                  onClick={() => handleDelete(user.userId)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar usuario */}
      {mostrarModal && editingUser && (
        <UserCreateModal
          onClose={() => {
            setMostrarModal(false)
            setEditingUser(null)
          }}
          usuarioAEditar={editingUser}
          modoEdicion={true}
        />
      )}
    </div>
  )
}
