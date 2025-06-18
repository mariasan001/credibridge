"use client"

/**
 * Esta es la sección de creación de usuarios
 * para Financiera
 */

import { useState } from "react"
import { PageLayout } from "@/components/PageLayout"
import UsersHeader from "./components/UsersHeader"
import UserCreateModal from "./components/UserCreateModal"
import ActiveUserTable from "./components/ActiveUserList"

export default function UsuariosPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <PageLayout>
      <UsersHeader onCreateUser={() => setShowModal(true)} />
      <ActiveUserTable />
      {showModal && <UserCreateModal onClose={() => setShowModal(false)} />}
    </PageLayout>
  )
}
