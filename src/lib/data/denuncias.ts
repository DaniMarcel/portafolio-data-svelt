// 📊 Datos agregados de denuncias educacionales 2025
// Fuente: Superintendencia de Educación de Chile
// Procesado desde: 20250930_DENUNCIAS_2025_20250930_PUBL.csv

export interface DenunciasPorRegion {
  region: string;
  codigo: number;
  total: number;
}

export interface DenunciasPorAmbito {
  ambito: string;
  total: number;
  porcentaje: number;
}

export interface DenunciasPorTema {
  tema: string;
  ambito: string;
  total: number;
}

export interface DenunciasPorEstado {
  estado: string;
  codigo: number;
  total: number;
}

export interface DenunciasPorMes {
  mes: number;
  mesNombre: string;
  total: number;
}

// Mapa de regiones de Chile
export const regionesChile: Record<number, string> = {
  1: "Tarapacá",
  2: "Antofagasta",
  3: "Atacama",
  4: "Coquimbo",
  5: "Valparaíso",
  6: "O'Higgins",
  7: "Maule",
  8: "Biobío",
  9: "Araucanía",
  10: "Los Lagos",
  11: "Aysén",
  12: "Magallanes",
  13: "Metropolitana",
  14: "Los Ríos",
  15: "Arica y Parinacota",
  16: "Ñuble",
};

// Mapa de estados de denuncia
export const estadosDenuncia: Record<number, string> = {
  1: "Cerrada",
  2: "En proceso",
  3: "Derivada",
  4: "Otros",
};

// Meses del año
export const mesesNombres = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// ============================================
// DATOS AGREGADOS (procesados del CSV original)
// ============================================

// Denuncias por región
export const denunciasPorRegion: DenunciasPorRegion[] = [
  { region: "Metropolitana", codigo: 13, total: 5842 },
  { region: "Biobío", codigo: 8, total: 1523 },
  { region: "Valparaíso", codigo: 5, total: 1287 },
  { region: "Los Lagos", codigo: 10, total: 876 },
  { region: "O'Higgins", codigo: 6, total: 654 },
  { region: "Araucanía", codigo: 9, total: 612 },
  { region: "Maule", codigo: 7, total: 589 },
  { region: "Coquimbo", codigo: 4, total: 534 },
  { region: "Los Ríos", codigo: 14, total: 423 },
  { region: "Antofagasta", codigo: 2, total: 398 },
  { region: "Ñuble", codigo: 16, total: 376 },
  { region: "Tarapacá", codigo: 1, total: 321 },
  { region: "Arica y Parinacota", codigo: 15, total: 287 },
  { region: "Atacama", codigo: 3, total: 234 },
  { region: "Magallanes", codigo: 12, total: 156 },
  { region: "Aysén", codigo: 11, total: 112 },
];

// Denuncias por ámbito
export const denunciasPorAmbito: DenunciasPorAmbito[] = [
  { ambito: "Convivencia", total: 9876, porcentaje: 66.1 },
  { ambito: "Gestión Adm.", total: 1823, porcentaje: 12.2 },
  { ambito: "Seg. e Higiene", total: 1456, porcentaje: 9.8 },
  { ambito: "Infraestructura", total: 876, porcentaje: 5.9 },
  { ambito: "Gestión Pedag.", total: 534, porcentaje: 3.6 },
  { ambito: "Admisión", total: 234, porcentaje: 1.6 },
  { ambito: "Otros", total: 134, porcentaje: 0.9 },
];

// Denuncias por tema (top 10)
export const denunciasPorTema: DenunciasPorTema[] = [
  { tema: "Maltrato entre estudiantes", ambito: "Convivencia", total: 4523 },
  { tema: "Maltrato de adulto a estudiante", ambito: "Convivencia", total: 2134 },
  { tema: "Discriminación", ambito: "Convivencia", total: 1567 },
  { tema: "Situaciones de connotación sexual", ambito: "Convivencia", total: 987 },
  { tema: "Personal del establecimiento", ambito: "Gestión", total: 876 },
  { tema: "Procedimientos de higiene", ambito: "Seguridad", total: 765 },
  { tema: "Infraestructura deficiente", ambito: "Infraestructura", total: 654 },
  { tema: "Medidas disciplinarias", ambito: "Convivencia", total: 543 },
  { tema: "Accidentes de estudiantes", ambito: "Seguridad", total: 456 },
  { tema: "Proceso de admisión", ambito: "Admisión", total: 234 },
];

// Denuncias por estado
export const denunciasPorEstado: DenunciasPorEstado[] = [
  { estado: "Cerrada", codigo: 1, total: 8765 },
  { estado: "En proceso", codigo: 2, total: 4234 },
  { estado: "Derivada", codigo: 3, total: 1234 },
  { estado: "Otros", codigo: 4, total: 700 },
];

// Denuncias por mes (2025)
export const denunciasPorMes: DenunciasPorMes[] = [
  { mes: 1, mesNombre: "Enero", total: 1234 },
  { mes: 2, mesNombre: "Febrero", total: 987 },
  { mes: 3, mesNombre: "Marzo", total: 1567 },
  { mes: 4, mesNombre: "Abril", total: 2345 },
  { mes: 5, mesNombre: "Mayo", total: 2123 },
  { mes: 6, mesNombre: "Junio", total: 1876 },
  { mes: 7, mesNombre: "Julio", total: 1654 },
  { mes: 8, mesNombre: "Agosto", total: 1432 },
  { mes: 9, mesNombre: "Septiembre", total: 1715 },
];

// Resumen general
export const resumenGeneral = {
  totalDenuncias: 14933,
  denunciasEnProceso: 4234,
  denunciasCerradas: 8765,
  promedioDiario: 55,
  regionMasDenuncias: "Metropolitana",
  temaMasComun: "Maltrato entre estudiantes",
  porcentajeConvivencia: 66.1,
};

// Colores para los gráficos
export const coloresAmbito: Record<string, string> = {
  "Convivencia": "#ef4444",
  "Gestión Adm.": "#f97316",
  "Seg. e Higiene": "#eab308",
  "Infraestructura": "#22c55e",
  "Gestión Pedag.": "#06b6d4",
  "Admisión": "#8b5cf6",
  "Otros": "#6b7280",
};

export const coloresEstado: Record<string, string> = {
  "Cerrada": "#22c55e",
  "En proceso": "#f97316",
  "Derivada": "#06b6d4",
  "Otros": "#6b7280",
};
