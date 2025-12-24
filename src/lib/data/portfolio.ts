// 👤 Datos del Portafolio de Daniel Marcel
export const profile = {
  name: "Daniel Andres Marcel Rivera",
  shortName: "Daniel Marcel",
  title: "Ingeniero en Informática",
  subtitle: "Especializándose en Ingeniería de Datos",
  email: "danielmarcelrivera@gmail.com",
  linkedin: "https://www.linkedin.com/in/danielmarcel/",
  github: "https://github.com/danielmarcel", // Placeholder - actualiza si es diferente
  
  // Descripción para la landing page
  bio: `Ingeniero en Informática con pasión por transformar datos en insights accionables. 
  Actualmente especializándome en Ingeniería de Datos, con experiencia en ETL, visualización 
  y desarrollo de pipelines de datos.`,
  
  // Habilidades técnicas
  skills: [
    { name: "Python", icon: "🐍", level: 60 },
    { name: "SQL", icon: "🗃️", level: 80 },
    { name: "Svelte", icon: "🔥", level: 50 },
    { name: "D3.js", icon: "📊", level: 40 },
    { name: "Power BI", icon: "📈", level: 60 },
    { name: "ETL/ELT", icon: "⚙️", level: 70 },
    { name: "React", icon: "⚛️", level: 70 },
    { name: "Observable Plot", icon: "📉", level: 40 },
  ],
  
  // Categorías de habilidades
  skillCategories: [
    { 
      name: "Data Engineering", 
      icon: "🔧",
      skills: ["Python", "SQL", "Apache Spark", "Airflow", "dbt"]
    },
    { 
      name: "Visualization", 
      icon: "📊",
      skills: ["D3.js", "Observable Plot", "Power BI", "Looker Studio"]
    },
    { 
      name: "Frontend", 
      icon: "💻",
      skills: ["Svelte", "React", "TypeScript", "HTML/CSS"]
    },
    { 
      name: "Cloud & DevOps", 
      icon: "☁️",
      skills: ["Azure", "GCP", "Git"]
    },
  ],
};

// Proyectos para el portafolio
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'data-viz' | 'data-eng' | 'web';
  image?: string;
  link?: string;
  github?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "dashboard-educacion",
    title: "Dashboard de Educación Superior",
    description: "Visualización interactiva de datos educativos con Svelte, D3.js y Observable Plot",
    longDescription: `Dashboard completo que muestra métricas de educación superior en Chile, 
    incluyendo matrículas por carrera, tendencias temporales y empleabilidad. Desarrollado como 
    proyecto educativo para demostrar el uso de Svelte con visualizaciones de datos.`,
    technologies: ["Svelte", "D3.js", "Observable Plot", "TypeScript"],
    category: "data-viz",
    link: "/",
    featured: true,
  },
  {
    id: "comparacion-d3-plot",
    title: "D3.js vs Observable Plot",
    description: "Comparación interactiva entre enfoques imperativo y declarativo de visualización",
    longDescription: `Página educativa que compara D3.js con Observable Plot, mostrando las 
    diferencias entre el enfoque imperativo y declarativo para crear visualizaciones de datos.`,
    technologies: ["D3.js", "Observable Plot", "Svelte"],
    category: "data-viz",
    link: "/comparison",
    featured: true,
  },
  {
    id: "denuncias-educacion",
    title: "Análisis de Denuncias Educación",
    description: "Visualización de datos de denuncias del sistema educacional chileno",
    longDescription: `Análisis exploratorio de datos de denuncias recibidas por la Superintendencia 
    de Educación, incluyendo distribución por región, tipo de denuncia, estado y tendencias temporales.`,
    technologies: ["Svelte", "D3.js", "Python", "Pandas"],
    category: "data-eng",
    link: "/denuncias",
    featured: true,
  },
];
