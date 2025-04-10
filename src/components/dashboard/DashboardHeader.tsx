// components/dashboard/DashboardHeader.tsx
"use client"

import React from "react"

export const DashboardHeader = () => {
  return (
    <div className="dashboard__header">
      <h2 className="dashboard__title">
        Bienvenido <span role="img" aria-label="saludo">👋</span>
      </h2>
      <p className="dashboard__subtitle">
        Aquí podrás observar el comportamiento de las dependencias.
      </p>
    </div>
  )
}
