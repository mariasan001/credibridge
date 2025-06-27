"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

import { ReportModal } from "@/components/ReportModal";
import { FloatingButton } from "@/components/loatingButton";

// Lazy load del Sidebar
const Sidebar = dynamic(() =>
  import("@/components/menu/Sidebar").then(mod => mod.Sidebar), {
    ssr: false,
    loading: () => <div className="w-[250px] bg-neutral-100" />,
  });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hideSidebarRoutes = [
    "/user/inicar-sesion",
    "/user/recuperacion",
    "/user/token",
    "/user/nuevacontrasena"
  ];

  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <div className="flex min-h-screen">
      {!shouldHideSidebar && <Sidebar />}
      <main className="flex-1">
        {children}

        {/* Botón flotante y modal, visibles solo si hay usuario y no estamos en rutas ocultas */}
        {user && !shouldHideSidebar && (
          <>
            <FloatingButton onClick={() => setOpen(true)} />
            {open && <ReportModal onClose={() => setOpen(false)} />}
          </>
        )}
      </main>
    </div>
  );
}
