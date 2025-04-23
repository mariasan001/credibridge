"use client"

import { useState } from "react"
import { UploadCloud } from "lucide-react"
import "./FormularioPublicacion.css"

export const FormularioPublicacion = () => {
  const [tipo, setTipo] = useState("comunicado")
  const [titulo, setTitulo] = useState("")
  const [comentario, setComentario] = useState("")
  const [emitidoPor, setEmitidoPor] = useState("")
  const [fechaExpiracion, setFechaExpiracion] = useState("")
  const [destinatarios, setDestinatarios] = useState([""])
  const [archivos, setArchivos] = useState<File[]>([])

  const agregarInstitucion = () => {
    setDestinatarios([...destinatarios, ""])
  }

  const actualizarInstitucion = (idx: number, valor: string) => {
    const copia = [...destinatarios]
    copia[idx] = valor
    setDestinatarios(copia)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArchivos(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      tipo,
      titulo,
      comentario,
      emitidoPor,
      destinatarios,
      archivos,
      fechaPublicacion: new Date().toISOString(),
      fechaExpiracion,
    })
  }

  return (
    <form className="formulario-publicacion" onSubmit={handleSubmit}>
      <h3>Crear Publicación</h3>

      {/* Tipo */}
      <label>Tipo</label>
      <div className="formulario-publicacion__etiquetas">
        {["comunicado", "importante", "recordatorio"].map((op) => (
          <button
            type="button"
            key={op}
            onClick={() => setTipo(op)}
            className={tipo === op ? "active" : ""}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Título */}
      <label>Título</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Escribe el título..."
      />

      {/* Emitido por */}
      <label>Emitido por</label>
      <input
        type="text"
        value={emitidoPor}
        onChange={(e) => setEmitidoPor(e.target.value)}
        placeholder="Nombre del gestor o institución"
      />

      {/* Fecha de expiración */}
      <label>Fecha de expiración</label>
      <input
        type="date"
        value={fechaExpiracion}
        onChange={(e) => setFechaExpiracion(e.target.value)}
      />

      {/* Comentario */}
      <label>Comentario</label>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe el contenido de la publicación..."
      />

      {/* Destinatarios */}
      <label>Destinatarios</label>
      {destinatarios.map((valor, i) => (
        <input
          key={i}
          type="text"
          value={valor}
          placeholder={`Institución ${i + 1}`}
          onChange={(e) => actualizarInstitucion(i, e.target.value)}
        />
      ))}
      {destinatarios.length < 5 && (
        <button
          type="button"
          onClick={agregarInstitucion}
          className="formulario-publicacion__agregar"
        >
          + Agregar Otra Institución
        </button>
      )}

      {/* Archivos */}
      <label>Adjuntar archivos</label>
      <div className="formulario-publicacion__archivos">
        <label className="archivo-label">
          <UploadCloud size={18} />
          <span>Seleccionar archivos</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            hidden
          />
        </label>

        {archivos.length > 0 && (
          <ul className="archivo-lista">
            {archivos.map((archivo, idx) => (
              <li key={idx}>{archivo.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Botón enviar */}
      <button type="submit" className="formulario-publicacion__submit">
        Enviar Publicación
      </button>
    </form>
  )
}
