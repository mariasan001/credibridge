"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth"; // ✅ Zustand hook

import { ReportModal } from "@/components/ReportModal";
import { FloatingButton } from "@/components/loatingButton";

// Lazy load del Sidebar
const Sidebar = dynamic(
  () => import("@/components/menu/Sidebar").then((mod) => mod.Sidebar),
  {
    ssr: false,
    loading: () => <div className="w-[250px] bg-neutral-100" />,
  }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, checkSession, loading } = useAuth(); // ✅ Zustand hook

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [reportesEnProceso, setReportesEnProceso] = useState(0);

  useEffect(() => {
    setMounted(true);
    checkSession(); // ✅ Validamos sesión solo una vez
  }, []);

  if (!mounted || loading) return null;

  const hideSidebarRoutes = [
    "/user/inicar-sesion",
    "/user/recuperacion",
    "/user/token",
    "/user/nuevacontrasena",
  ];

  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  const handleStartReporte = () => setReportesEnProceso((prev) => prev + 1);
  const handleFinishReporte = () => setReportesEnProceso((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex min-h-screen">
      {!shouldHideSidebar && <Sidebar />}
      <main className="flex-1">
        {children}

        {user && !shouldHideSidebar && (
          <>
            <FloatingButton
              onClick={() => setOpen(true)}
              reportCount={reportesEnProceso}
            />
            {open && (
              <ReportModal
                onClose={() => setOpen(false)}
                onStart={handleStartReporte}
                onFinish={handleFinishReporte}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
