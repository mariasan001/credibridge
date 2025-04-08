"use client"

import React from "react"

interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  )
}
