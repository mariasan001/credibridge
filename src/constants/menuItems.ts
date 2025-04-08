"use client"

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
} from "lucide-react"

// Arreglo de elementos del menú lateral con rutas, íconos y permisos por rol
export const menuItems = [
  {
    label: "Inicio",
    icon: Home,
    route: "/",
    roles: [0, 1, 2], // Roles permitidos
  },
  {
    label: "Gestión de Personal",
    icon: Users,
    route: "/gestion-personal",
    roles: [0, 1, 2],
    children: [
      {
        label: "Buscar Servidor Público",
        route: "/gestion-personal/buscar-servidor",
        roles: [0, 1, 2],
      },
    ],
  },
  {
    label: "Comparativas",
    icon: BarChart2,
    route: "/comparativas",
    roles: [0, 1],
    children: [
      {
        label: "Ranking de Instituciones",
        route: "/comparativas/ranking-instituciones",
        roles: [0, 1],
      },
      {
        label: "Resumen de Periodos",
        route: "/comparativas/resumen-periodo",
        roles: [0, 1],
      },
    ],
  },
  {
    label: "Historial",
    icon: Clock,
    route: "/historial",
    roles: [0, 1, 2],
    children: [
      {
        label: "Historial de Solicitudes",
        route: "/historial/historia-solicitudes",
        roles: [0, 1, 2],
      },
      {
        label: "Historial de Quejas",
        route: "/historial/histroial-quejas",
        roles: [0, 1, 2],
      },
    ],
  },
  {
    label: "Reportes y Consultas",
    icon: FileText,
    route: "/reportes-consultas",
    roles: [0, 1],
    children: [
      { label: "Conciliación", route: "/reportes-consultas/concialicion", roles: [0] },
      { label: "Consulta TNIS", route: "/reportes-consultas/reporte-tnis", roles: [0] },
      { label: "Contratos a expirar", route: "/reportes-consultas/contratos-expirar", roles: [0] },
      { label: "Contratos Bloqueados", route: "/reportes-consultas/contratos-bloqueados", roles: [0] },
      { label: "Contratos Modificados", route: "/reportes-consultas/contratos-modificados", roles: [0] },
      { label: "Contratos Pagados", route: "/reportes-consultas/contratos-pagados", roles: [0] },
      { label: "Contratos Terminados", route: "/reportes-consultas/contratos-terminados", roles: [0] },
      { label: "Insertados por Nómina", route: "/reportes-consultas/insetados-nomina", roles: [0, 1] },
      { label: "Instalados por Periodo", route: "/reportes-consultas/instalados-periodos", roles: [0, 1] },
      { label: "Liquidaciones", route: "/reportes-consultas/liquidaciones", roles: [0] },
      { label: "Modalidad por Nómina", route: "/reportes-consultas/modalidad-nominas", roles: [0] },
      { label: "Reservas Activas", route: "/reportes-consultas/reservas-activas", roles: [0, 1] },
      { label: "Reservas en el periodo", route: "/reportes-consultas/reservas-periodo", roles: [0, 1] },
    ],
  },
  {
    label: "Procesos Autorizados",
    icon: BadgeCheck,
    route: "/procesos-autorizados",
    roles: [0, 1],
    children: [
      {
        label: "Intercambio de Archivos",
        route: "/procesos-autorizados/intercambio-archivos",
        roles: [0, 1],
      },
      {
        label: "Procesamiento por lote",
        route: "/procesos-autorizados/proceso-lote",
        roles: [0],
      },
    ],
  },
  {
    label: "Simulación",
    icon: Cpu,
    route: "/simulacion",
    roles: [0, 1],
  },
  {
    label: "Centro de Comunicación",
    icon: MessageCircle,
    route: "/centro-de-comunicacion",
    roles: [0, 1, 2],
    children: [
      { label: "Portal de Comunicación", route: "/centro-comunicacion/portal-comunicacion", roles: [0, 1, 2] },
      { label: "Reportes", route: "/centro-comunicacion/reports", roles: [0, 1, 2] },
      { label: "Chat", route: "/centro-comunicacion/chat", roles: [0, 1, 2] },
    ],
  },
  {
    label: "Configuración",
    icon: Settings,
    route: "/configuracion",
    roles: [0, 1, 2],
  },
  {
    label: "Cartera de Clientes",
    icon: Briefcase,
    route: "/cartera-clientes",
    roles: [2],
  },
  {
    label: "Prospectos",
    icon: BadgeCheck,
    route: "/prospectos",
    roles: [2],
  },
]
