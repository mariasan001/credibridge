"use client";

// Importaciones de íconos desde lucide-react
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
  Target,
  ClipboardList,
} from "lucide-react";

// Arreglo de elementos del menú lateral con rutas, íconos y permisos por rol
//1	"ADMIN"
//2	"ADMIN_NOM"
//3	"USER"
//4	"FINANCIERA_ADM"
//5	"FINANCIERA_EJEC"
//6	"FINANCIERA_ASES"

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
    route: "/admin_nom/inicio",
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
    roles: [4,5],
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
    roles: [1, 2, 4],
    children: [
      {
        label: "Buscar Servidor Público",
        route: "/gestion-personal/buscar-servidor",
        roles: [1, 2, 4],
      },
    ],
  },
  {
    label: "Comparativas",
    icon: BarChart2,
    route: "/comparativas",
    roles: [1, 2, 4],
    children: [
      {
        label: "Ranking de Instituciones",
        route: "/comparativas/ranking-instituciones",
        roles: [1, 2],
      },
      {
        label: "Ranking de servicios",
        route: "/comparativas/ranking-personal",
        roles: [4],
      },
      {
        label: "Resumen de Periodos",
        route: "/comparativas/resumen-periodo",
        roles: [1, 2, 4],
      },
    ],
  },
,
  {
    label: "Reportes y Consultas",
    icon: FileText,
    route: "/reportes-consultas",
    roles: [1, 2, 4],
    children: [
      {
        label: "Conciliación",
        route: "/reportes-consultas/concialicion",
        roles: [1, 2],
      },
      {
        label: "Consulta TNIS",
        route: "/reportes-consultas/reporte-tnis",
        roles: [1, 2],
      },
      {
        label: "Contratos a expirar",
        route: "/reportes-consultas/contratos-expirar",
        roles: [1, 2, 4],
      },
      {
        label: "Contratos Bloqueados",
        route: "/reportes-consultas/contratos-bloqueados",
        roles: [1, 2, 4],
      },
      {
        label: "Contratos Modificados",
        route: "/reportes-consultas/contratos-modificados",
        roles: [1, 2, 4],
      },
      {
        label: "Contratos Pagados",
        route: "/reportes-consultas/contratos-pagados",
        roles: [1, 2, 4],
      },
      {
        label: "Contratos Terminados",
        route: "/reportes-consultas/contratos-terminados",
        roles: [1, 2, 4],
      },
      {
        label: "Insertados por Nómina",
        route: "/reportes-consultas/insetados-nomina",
        roles: [1, 2],
      },
      {
        label: "Instalados por Periodo",
        route: "/reportes-consultas/instalados-periodos",
        roles: [1, 2, 4],
      },
      {
        label: "Liquidaciones",
        route: "/reportes-consultas/liquidaciones",
        roles: [1, 2, 4],
      },
      {
        label: "Modalidad por Nómina",
        route: "/reportes-consultas/modalidad-nominas",
        roles: [1, 2],
      },
      {
        label: "Reservas Activas",
        route: "/reportes-consultas/reservas-activas",
        roles: [1, 2],
      },
      {
        label: "Reservas en el periodo",
        route: "/reportes-consultas/reservas-periodo",
        roles: [1, 2, 4],
      },
    ],
  },
    {
    label: "Prospectos",
    icon: BadgeCheck,
    route: "/prospectos",
    roles: [5],
  },
  {
    label: "Procesos Autorizados",
    icon: BadgeCheck,
    route: "/procesos-autorizados",
    roles: [1, 2],
    children: [
      {
        label: "Intercambio de Archivos",
        route: "/procesos-autorizados/intercambio-archivos",
        roles: [1, 2],
      },
      {
        label: "Procesamiento por lote",
        route: "/procesos-autorizados/proceso-lote",
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
    label: "Simulación",
    icon: Cpu,
    route: "/simulacion",
    roles: [1, 2],
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
        roles: [1, 2, 3, 4, 5],
      },
    ],
  },
    {
    label: "Historial",
    icon: Clock,
    route: "/historial",
    roles: [1, 2, 4,5],
    children: [
      {
        label: "Historial de Solicitudes",
        route: "/historial/historia-solicitudes",
        roles: [1, 2, 4,5],
      },
      {
        label: "Historial de Quejas",
        route: "/historial/histroial-quejas",
        roles: [1, 2, 4,5],
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
        roles: [1, 2, 4],
      },
      {
        label: "Actualizar contraseña",
        route: "/configuracion/contrasena",
        roles: [1, 2, 4, 3, 5, 6],
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

  // ESTAS OPCIONES SON ESCLUCIDIVAS PARA USUARIOS / SERVIDORES PUBLICOS

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
