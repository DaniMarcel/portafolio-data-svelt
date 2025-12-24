// 📊 Dataset de Educación - Chile
// Este archivo contiene datos simulados pero realistas sobre educación

export interface Institucion {
  id: number;
  nombre: string;
  tipo: 'Universidad' | 'Instituto' | 'CFT';
  region: string;
  matricula2024: number;
  matricula2023: number;
  tasaRetencion: number; // porcentaje
}

export interface CarreraDemanda {
  carrera: string;
  area: string;
  matricula: number;
  crecimiento: number; // vs año anterior
  empleabilidad: number; // porcentaje
}

export interface TendenciaTemporal {
  año: number;
  matriculaTotal: number;
  universidades: number;
  institutos: number;
  cfts: number;
}

// Datos de instituciones
export const instituciones: Institucion[] = [
  { id: 1, nombre: "U. de Chile", tipo: "Universidad", region: "Metropolitana", matricula2024: 42500, matricula2023: 41200, tasaRetencion: 92 },
  { id: 2, nombre: "PUC", tipo: "Universidad", region: "Metropolitana", matricula2024: 31200, matricula2023: 30800, tasaRetencion: 94 },
  { id: 3, nombre: "U. de Concepción", tipo: "Universidad", region: "Biobío", matricula2024: 28400, matricula2023: 27900, tasaRetencion: 89 },
  { id: 4, nombre: "USACH", tipo: "Universidad", region: "Metropolitana", matricula2024: 22100, matricula2023: 21500, tasaRetencion: 87 },
  { id: 5, nombre: "UTFSM", tipo: "Universidad", region: "Valparaíso", matricula2024: 18500, matricula2023: 18200, tasaRetencion: 88 },
  { id: 6, nombre: "DUOC UC", tipo: "Instituto", region: "Metropolitana", matricula2024: 98000, matricula2023: 95000, tasaRetencion: 78 },
  { id: 7, nombre: "INACAP", tipo: "Instituto", region: "Metropolitana", matricula2024: 115000, matricula2023: 112000, tasaRetencion: 75 },
  { id: 8, nombre: "AIEP", tipo: "Instituto", region: "Metropolitana", matricula2024: 72000, matricula2023: 70500, tasaRetencion: 72 },
];

// Carreras con mayor demanda
export const carrerasDemanda: CarreraDemanda[] = [
  { carrera: "Ingeniería en Informática", area: "Tecnología", matricula: 45200, crecimiento: 15.2, empleabilidad: 94 },
  { carrera: "Ciencia de Datos", area: "Tecnología", matricula: 8500, crecimiento: 42.0, empleabilidad: 96 },
  { carrera: "Enfermería", area: "Salud", matricula: 38700, crecimiento: 8.5, empleabilidad: 91 },
  { carrera: "Ingeniería Civil", area: "Ingeniería", matricula: 22100, crecimiento: -2.3, empleabilidad: 85 },
  { carrera: "Administración de Empresas", area: "Negocios", matricula: 51200, crecimiento: 3.1, empleabilidad: 78 },
  { carrera: "Psicología", area: "Ciencias Sociales", matricula: 42800, crecimiento: 1.2, empleabilidad: 72 },
  { carrera: "Derecho", area: "Ciencias Sociales", matricula: 28900, crecimiento: -5.1, empleabilidad: 68 },
  { carrera: "Ingeniería en Automatización", area: "Tecnología", matricula: 12300, crecimiento: 28.5, empleabilidad: 92 },
];

// Tendencia temporal (últimos 5 años)
export const tendenciaTemporal: TendenciaTemporal[] = [
  { año: 2020, matriculaTotal: 1180000, universidades: 650000, institutos: 420000, cfts: 110000 },
  { año: 2021, matriculaTotal: 1150000, universidades: 640000, institutos: 405000, cfts: 105000 },
  { año: 2022, matriculaTotal: 1195000, universidades: 660000, institutos: 425000, cfts: 110000 },
  { año: 2023, matriculaTotal: 1220000, universidades: 680000, institutos: 430000, cfts: 110000 },
  { año: 2024, matriculaTotal: 1255000, universidades: 700000, institutos: 440000, cfts: 115000 },
];

// Métricas resumen para el dashboard
export const metricas = {
  totalEstudiantes: 1255000,
  totalInstituciones: 156,
  tasaRetencionPromedio: 81.5,
  crecimientoAnual: 2.8,
};
