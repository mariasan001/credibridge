"use client";

import { createContext, useContext, useState } from "react";

const UIContext = createContext<{
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
}>({
  isSidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <UIContext.Provider value={{ isSidebarCollapsed, setSidebarCollapsed }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
