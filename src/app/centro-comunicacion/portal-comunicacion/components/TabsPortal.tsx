    "use client"

import { useState } from "react"
import { Megaphone, FileText, Archive } from "lucide-react"
import "./TabsPortal.css"

const tabs = [
  { label: "Portal", icon: <Megaphone size={16} /> },
  { label: "Mis publicaciones", icon: <FileText size={16} /> },
  { label: "Archivados", icon: <Archive size={16} /> },
]

interface TabsPortalProps {
  onTabChange?: (tab: string) => void
}

export const TabsPortal = ({ onTabChange }: TabsPortalProps) => {
  const [activeTab, setActiveTab] = useState("Portal")

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="tabs-portal">
      {tabs.map(({ label, icon }) => (
        <button
          key={label}
          className={`tab-portal__btn ${activeTab === label ? "active" : ""}`}
          onClick={() => handleTabClick(label)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
