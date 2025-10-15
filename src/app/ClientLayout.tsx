"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { ReportModal } from "@/components/ReportModal";
import { useAuth } from "@/hooks/useAuth";

// RUM hooks
import { useRouteMetrics } from "@/lib/route-metrics";
import { usePerfMark } from "@/lib/usePerfMark";
import { track } from "../lib/rum";
import { FloatingButton } from "@/components/loatingButton";

// ✅ constante fuera del componente (no es hook)
const HIDE_SIDEBAR_ROUTES = [
  "/user/inicar-sesion",   // ✅ corregido
  "/user/recuperacion",
  "/user/token",
  "/user/nuevacontrasena",
];

const Sidebar = dynamic(
  () => import("@/components/menu/Sidebar").then((m) => m.Sidebar),
  { ssr: false, loading: () => <div className="w-[250px] bg-neutral-100" /> }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // 🔒 Todos los hooks siempre se llaman, en el mismo orden
  usePerfMark("ClientLayout");
  useRouteMetrics();

  const pathname = usePathname();
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [reportesEnProceso, setReportesEnProceso] = useState(0);

  useEffect(() => setMounted(true), []);

  const shouldHideSidebar = HIDE_SIDEBAR_ROUTES.includes(pathname);

  useEffect(() => {
    track({
      kind: "ui",
      name: "layout_state",
      path: pathname,
      sidebar: shouldHideSidebar ? "hidden" : "visible",
      authed: Boolean(user),
    });
  }, [pathname, shouldHideSidebar, user]);

  // 👇 El return condicional va DESPUÉS de todos los hooks
  if (!mounted) return null;

  const handleStartReporte = () => {
    setReportesEnProceso((p) => {
      const next = p + 1;
      track({ kind: "ui", name: "reporte_start", count: next });
      return next;
    });
  };
  const handleFinishReporte = () => {
    setReportesEnProceso((p) => {
      const next = Math.max(p - 1, 0);
      track({ kind: "ui", name: "reporte_finish", count: next });
      return next;
    });
  };

  return (
    <div className="flex min-h-screen">
      {!shouldHideSidebar && <Sidebar />}
      <main className="flex-1">
        {children}

        {user && !shouldHideSidebar && (
          <>
            <FloatingButton
              onClick={() => {
                setOpen(true);
                track({ kind: "ui", name: "floating_open" });
              }}
              reportCount={reportesEnProceso}
            />
            {open && (
              <ReportModal
                onClose={() => {
                  setOpen(false);
                  track({ kind: "ui", name: "floating_close" });
                }}
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
