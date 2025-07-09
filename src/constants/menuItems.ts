"use client";

// Importación de íconos desde lucide-react
import {
  Home,
  Users,
  FileText,
  BarChart2,
  Clock,
  Cpu,
  Settings,
  Briefcase,
  MessageCircle,
  BadgeCheck,
  BookUser,
  Megaphone,
} from "lucide-react";

// Si tienes un tipo `MenuItem`, mejor aún
// import { MenuItem } from "@/types/menu";

export const menuItems = [
  {
    label: "Inicio Admin",
    icon: Home,
    route: "/admin/inicio",
    roles: [1],
  },
  {
    label: "Inicio Admin Nómina",
    icon: Home,
    route: "/inicio_nom",
    roles: [2],
  },
  {
    label: "Inicio Usuario",
    icon: Home,
    route: "/perfil_user/inicio",
    roles: [3],
  },
  {
    label: "Inicio ",
    icon: Home,
    route: "/inicio/inicio_finaciera/ini_admin",
    roles: [4, 5],
  },
  {
    label: "Inicio Asesor",
    icon: Home,
    route: "/prospectos",
    roles: [6],
  },
  {
    label: "Gestión de Personal",
    icon: Users,
    route: "/gestion-personal",
    roles: [1, 2, 4, 5],
    children: [
      {
        label: "Buscar usuario",
        route: "/gestion-personal/buscar-servidor",
        roles: [1, 2, 4, 5],
      },
      {
        label: "Valoracion",
        route: "/valoracion",
        roles: [4],
      },
      {
        label: "Compra/ Venta de deuda",
        route: "/gestion-personal/compra_de_deuda",
        roles: [1, 2, 4, 5],
      },
    ],
  },
  {
    label: "Historial",
    icon: Clock,
    route: "/solcitudes_quejas",
    roles: [1, 2 ],
  },
  {
    label: "Comparativas",
    icon: BarChart2,
    route: "/comparativas",
    roles: [],
    children: [
      {
        label: "Ranking de Instituciones",
        route: "/comparativas/ranking-instituciones",
        roles: [],
      },
      {
        label: "Resumen de Periodos",
        route: "/comparativas/resumen-periodo",
        roles: [],
      },
    ],
  },
  {
    label: "Reportes y Consultas",
    icon: FileText,
    route: "/reportes-consultas",
    roles: [1, 2],
    children: [
      {
        label: "Resumen de Periodos",
        route: "/comparativas/resumen-periodo",
        roles: [1, 2],
      },
      {
        label: "Contratos por Financiera",
        route: "/gestion-personal/contratos",
        roles: [1, 2],
      },
      {
        label: "Historial de Reportes  ",
        route: "/comparativas/reportes",
        roles: [1, 2, 4, 5],
      },
      {
        label: "Consulta TNIS",
        route: "/reportes-consultas/reporte-tnis",
        roles: [],
      },
      {
        label: "Contratos a expirar",
        route: "/reportes-consultas/contratos-expirar",
        roles: [],
      },
      {
        label: "Contratos Bloqueados",
        route: "/reportes-consultas/contratos-bloqueados",
        roles: [],
      },
      {
        label: "Contratos Modificados",
        route: "/reportes-consultas/contratos-modificados",
        roles: [],
      },
      {
        label: "Contratos Pagados",
        route: "/reportes-consultas/contratos-pagados",
        roles: [],
      },
      {
        label: "Contratos Terminados",
        route: "/reportes-consultas/contratos-terminados",
        roles: [],
      },
      {
        label: "Insertados por Nómina",
        route: "/reportes-consultas/insetados-nomina",
        roles: [],
      },
      {
        label: "Instalados por Periodo",
        route: "/reportes-consultas/instalados-periodos",
        roles: [],
      },
      {
        label: "Liquidaciones",
        route: "/reportes-consultas/liquidaciones",
        roles: [],
      },
      {
        label: "Modalidad por Nómina",
        route: "/reportes-consultas/modalidad-nominas",
        roles: [],
      },
      {
        label: "Reservas Activas",
        route: "/reportes-consultas/reservas-activas",
        roles: [],
      },
      {
        label: "Reservas en el periodo",
        route: "/reportes-consultas/reservas-periodo",
        roles: [],
      },
    ],
  },
  {
    label: "Prospectos",
    icon: BadgeCheck,
    route: "/prospectos",
    roles: [4, 5],
  },
  {
    label: "Financieras",
    icon: BookUser,
    route: "/financieras",
    roles: [1, 2],
    children: [
      {
        label: "Nueva Financiera",
        route: "/financieras/nueva",
        roles: [1, 2],
      },
         {
        label: "Nuevo Servcio",
        route: "/financieras/servicios",
        roles: [1, 2],
      },
    ],
  },
  {
    label: "Procesos Autorizados",
    icon: BadgeCheck,
    route: "/procesos-autorizados",
    roles: [1, 2],
    children: [
      {
        label: "Conciliación",
        route: "/procesos-autorizados/intercambio-archivos",
        roles: [1, 2],
      },
      {
        label: "Actualizacion de datos",
        route: "/procesos-autorizados/proceso-lote",
        roles: [1, 2],
      },
      {
        label: "Actualizar Archivos de Nomina ",
        route: "/procesos-autorizados/archivos_nomina",
        roles: [1, 2],
      },
      {
        label: "Calendario ",
        route: "/procesos-autorizados/calendarizacion",
        roles: [1, 2],
      },
    ],
  },
  {
    label: "Cartera de Clientes",
    icon: Briefcase,
    route: "/cartera-clientes",
    roles: [4, 5],
  },
  {
    label: "Centro de Comunicación",
    icon: MessageCircle,
    route: "/centro-de-comunicacion",
    roles: [1, 2, 3, 4],
    children: [
      {
        label: "Portal de Comunicación",
        route: "/centro-comunicacion/portal-comunicacion",
        roles: [1, 2, 3, 4, 5],
      },
      {
        label: "Reportes",
        route: "/centro-comunicacion/reports",
        roles: [1, 2, 3, 4, 5],
      },
      {
        label: "Chat",
        route: "/centro-comunicacion/chat",
        roles: [],
      },
    ],
  },
  {
    label: "Historial",
    icon: Clock,
    route: "/historial",
    roles: [4, 5],
    children: [
      {
        label: "Historial de Solicitudes",
        route: "/historial/historia-solicitudes",
        roles: [4, 5],
      },
      {
        label: "Historial de Quejas",
        route: "/historial/histroial-quejas",
        roles: [4, 5],
      },
    ],
  },
  {
    label: "Configuración",
    icon: Settings,
    route: "/configuracion",
    roles: [1, 2, 3, 4, 5, 6],
    children: [
      {
        label: "Administración de Usuarios",
        route: "/configuracion/admin_user",
        roles: [4],
      },

      { label: "Perfil", route: "/perfil_user/perfil", roles: [3] },
      { label: "Perfil", route: "/perfil_user/perfil", roles: [1, 2, 4, 5, 6] },
    ],
  },
  {
    label: " Difusión Comercial ",
    icon: Megaphone,
    route: "/difucion",
    roles: [4, 5],
  },
  // --- EXCLUSIVOS PARA SERVIDORES PÚBLICOS ---
  {
    label: "Simulación",
    icon: Cpu,
    route: "/perfil_user/simulacion",
    roles: [3],
  },
  {
    label: "Movimientos",
    icon: Clock,
    route: "/perfil_user/movimintos",
    roles: [3],
  },
  {
    label: "Solicitudes / Quejas",
    icon: BadgeCheck,
    route: "/perfil_user/solicitudes_quejas",
    roles: [3],
  },
  {
    label: "Directorio",
    icon: BookUser,
    route: "/perfil_user/directorio",
    roles: [3],
  },
  {
    label: "Documentación",
    icon: FileText,
    route: "/perfil_user/documentacion",
    roles: [3],
  },
  {
    label: "Notificaciones",
    icon: MessageCircle,
    route: "/perfil_user/notificaciones",
    roles: [3],
  },
];
