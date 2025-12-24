# 📊 Portafolio de Visualización de Datos

**Daniel Andres Marcel Rivera**  
_Ingeniero en Informática - Especializándose en Ingeniería de Datos_

Un portafolio interactivo construido con **SvelteKit**, **D3.js** y **Observable Plot** para demostrar habilidades de visualización de datos.

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:5173
```

---

## 📁 Estructura del Proyecto

```
svelt_viz/
├── src/
│   ├── lib/                    # Código reutilizable
│   │   ├── components/         # Componentes Svelte
│   │   │   ├── MetricCard.svelte    # Tarjeta de métrica KPI
│   │   │   ├── Tooltip.svelte       # Tooltip global reutilizable
│   │   │   ├── FilterBar.svelte     # Barra de filtros
│   │   │   └── PlotChart.svelte     # Wrapper para Observable Plot
│   │   ├── data/               # Datos y configuraciones
│   │   │   ├── education.ts         # Datos educativos simulados
│   │   │   ├── portfolio.ts         # Perfil y proyectos
│   │   │   └── denuncias.ts         # Datos de denuncias
│   │   └── stores/             # Svelte Stores (estado global)
│   │       └── tooltip.ts           # Store para tooltip
│   │
│   └── routes/                 # Páginas (SvelteKit file-based routing)
│       ├── +layout.svelte           # Layout global (navbar, estilos)
│       ├── +page.svelte             # Página principal (/)
│       ├── portfolio/
│       │   └── +page.svelte         # Landing page (/portfolio)
│       ├── comparison/
│       │   └── +page.svelte         # D3 vs Plot (/comparison)
│       └── denuncias/
│           └── +page.svelte         # Dashboard denuncias (/denuncias)
│
├── static/                     # Archivos estáticos (favicon, imágenes)
├── package.json                # Dependencias
├── svelte.config.js            # Configuración SvelteKit
├── vite.config.ts              # Configuración Vite
└── tsconfig.json               # Configuración TypeScript
```

---

## 🎓 Guía de Svelte para Principiantes

### ¿Qué es Svelte?

Svelte es un **compilador** que convierte componentes en JavaScript eficiente. A diferencia de React/Vue que usan Virtual DOM, Svelte compila todo en build time.

### Sintaxis Básica

```svelte
<script lang="ts">
  // Variables reactivas (equivalente a useState en React)
  let count = 0;

  // Computed/Derived (equivalente a useMemo)
  $: doubled = count * 2;

  // Efectos (equivalente a useEffect)
  $: console.log(`El count cambió: ${count}`);
</script>

<!-- Template HTML con interpolación -->
<button on:click={() => count++}>
  Clicks: {count} (doble: {doubled})
</button>

<style>
  /* CSS con scope automático al componente */
  button { background: purple; color: white; }
</style>
```

### Conceptos Clave

| Concepto          | Svelte                  | React Equivalente              |
| ----------------- | ----------------------- | ------------------------------ |
| **Estado local**  | `let variable = valor`  | `useState()`                   |
| **Reactividad**   | `$: computed = ...`     | `useMemo()`                    |
| **Efectos**       | `$: { código }`         | `useEffect()`                  |
| **Props**         | `export let prop`       | `function Component({ prop })` |
| **Eventos**       | `on:click={handler}`    | `onClick={handler}`            |
| **Bindings**      | `bind:value={variable}` | `value={val} onChange={...}`   |
| **Estado global** | Svelte Stores           | Context API / Redux            |

### Svelte Stores (Estado Global)

```typescript
// stores/tooltip.ts
import { writable } from "svelte/store";

export const tooltipStore = writable({
  visible: false,
  content: "",
  x: 0,
  y: 0,
});
```

```svelte
<script>
  import { tooltipStore } from '$lib/stores/tooltip';

  // El $ auto-suscribe al store
  $: visible = $tooltipStore.visible;
</script>
```

### SvelteKit Routing

SvelteKit usa **file-based routing**:

```
src/routes/
├── +page.svelte          → /
├── +layout.svelte        → Layout para todas las páginas
├── about/
│   └── +page.svelte      → /about
└── blog/
    ├── +page.svelte      → /blog
    └── [slug]/
        └── +page.svelte  → /blog/:slug (rutas dinámicas)
```

---

## 📊 Librerías de Visualización

### D3.js (Imperativo)

- Control total sobre cada elemento SVG
- Más código, más flexibilidad
- Curva de aprendizaje pronunciada

```javascript
// ~50 líneas para un gráfico de barras
const svg = d3.select(container).append('svg')...
const x = d3.scaleBand()...
svg.selectAll('rect').data(data).enter()...
```

### Observable Plot (Declarativo)

- API de alto nivel, menos código
- Tooltips automáticos con `tip: true`
- Ideal para exploración rápida

```javascript
// ~10 líneas para el mismo gráfico
Plot.plot({
  marks: [Plot.barY(data, { x: "name", y: "value", tip: true })],
});
```

---

## 🌐 Páginas del Portafolio

| Ruta          | Descripción                 |
| ------------- | --------------------------- |
| `/portfolio`  | Landing page personal       |
| `/`           | Dashboard educación (D3.js) |
| `/denuncias`  | Dashboard denuncias 2025    |
| `/comparison` | Comparación D3 vs Plot      |

---

## 🛠️ Tecnologías Usadas

- **SvelteKit** - Framework web
- **TypeScript** - Tipado estático
- **D3.js** - Visualización imperativa
- **Observable Plot** - Visualización declarativa
- **Vite** - Build tool ultra-rápido

---

## 📦 Scripts Disponibles

```bash
npm run dev       # Servidor desarrollo
npm run build     # Build producción
npm run preview   # Preview del build
npm run check     # Verificar tipos TypeScript
```

---

## 🚀 Deploy

Para desplegar en **Vercel**:

```bash
npm i -g vercel
vercel
```

Para **Netlify**:

```bash
npm run build
# Subir carpeta 'build' a Netlify
```

---

## 📝 Licencia

MIT © 2024 Daniel Marcel
