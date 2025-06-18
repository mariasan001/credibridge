"use client"

import { useEffect, useState } from "react"
import { User } from "../model/User"
import { fetchActiveUsers, deleteUser } from "../service/userService"
import { Pencil, Trash2 } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import "./ActiveUserTable.css"

export default function ActiveUserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActiveUsers().then(data => {
      setUsers(data)
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

  if (loading) return <p>Cargando usuarios...</p>

  return (
    <div className="user-table-container">
      <Toaster position="top-right" />
      <h2>Usuarios Activos</h2>
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
                <button className="edit-btn" title="Editar">
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
    </div>
  )
}
