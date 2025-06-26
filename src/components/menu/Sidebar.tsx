"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { menuItems } from "@/constants/menuItems";

import "@/styles/sidebar.css";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarBottom } from "./SidebarBottom";
import { MenuItem } from "./types/menu";

export const Sidebar = () => {
  const { user, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true); // ✅ Tipo explícito
  const pathname = usePathname();

  const isBrowser = typeof window !== "undefined";

  // 🧠 Cargar estado inicial del sidebar desde localStorage
  useEffect(() => {
    if (isBrowser) {
      const saved = localStorage.getItem("sidebar-collapsed");
      const initial = saved === "false" ? false : true;
      setIsCollapsed(initial);
      document.body.classList.toggle("sidebar-collapsed", initial);
    }
  }, []);

  // 💾 Guardar en localStorage cada vez que cambia
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem("sidebar-collapsed", String(isCollapsed));
      document.body.classList.toggle("sidebar-collapsed", isCollapsed);
    }
  }, [isCollapsed]);

  // ✅ Corrigiendo el tipo de parámetro
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const toggleSubmenu = (route: string) =>
    setOpenMenu(prev => (prev === route ? null : route));

  if (loading) return null;
  if (!user || !Array.isArray(user.roles)) return null;

  const userRoles = user.roles.map(r => r.id);

  const filteredMenuItems: MenuItem[] = menuItems.filter(
    (item): item is MenuItem =>
      !!item && item.roles?.some(role => userRoles.includes(role))
  );

  const mainItems: MenuItem[] = filteredMenuItems.filter(
    (item): item is MenuItem =>
      !["/configuracion", "/centro-de-comunicacion"].includes(item.route)
  );

  const bottomItems: MenuItem[] = filteredMenuItems.filter(
    (item): item is MenuItem =>
      ["/configuracion", "/centro-de-comunicacion"].includes(item.route)
  );

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <SidebarHeader
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />

      <SidebarMenu
        items={mainItems}
        user={user}
        isCollapsed={isCollapsed}
        openMenu={openMenu}
        toggleSubmenu={toggleSubmenu}
        pathname={pathname}
      />

      <SidebarBottom
        items={bottomItems}
        user={user}
        isCollapsed={isCollapsed}
        openMenu={openMenu}
        toggleSubmenu={toggleSubmenu}
        pathname={pathname}
      />
    </aside>
  );
};
