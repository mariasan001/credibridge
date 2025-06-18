"use client"

import { useState } from "react"
import { createUser, CreateUserPayload } from "../service/userService"
import toast from "react-hot-toast"
import "./UserCreateModal.css"

interface Props {
  onClose: () => void
}

export default function UserCreateModal({ onClose }: Props) {
  const [form, setForm] = useState<CreateUserPayload>({
    usuario: "",
    name: "",
    firstname: "",
    secondName: "",
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      await createUser(form)
      toast.success("Usuario creado correctamente")
      onClose()
    } catch (err) {
      console.error(err)
      toast.error("Error al crear usuario")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Crear nuevo usuario</h3>
        <div className="form-group">
          <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange} />
          <input name="name" placeholder="Nombre completo" value={form.name} onChange={handleChange} />
          <input name="firstname" placeholder="Primer nombre" value={form.firstname} onChange={handleChange} />
          <input name="secondName" placeholder="Segundo nombre" value={form.secondName} onChange={handleChange} />
          <input name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="submit-btn" onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  )
}
