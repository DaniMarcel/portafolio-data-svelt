<!--
  📊 PlotChart.svelte - Gráficos con Observable Plot
  
  ╔═══════════════════════════════════════════════════════════════╗
  ║  D3.js vs OBSERVABLE PLOT                                     ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  D3.js (Imperativo - ~50 líneas):                             ║
  ║  const svg = d3.select(container).append('svg')...            ║
  ║  const x = d3.scaleBand().domain(...)                         ║
  ║  const y = d3.scaleLinear().domain(...)                       ║
  ║  svg.selectAll('rect').data(data).enter()                     ║
  ║     .append('rect').attr('x', ...).attr('y', ...)             ║
  ║  svg.append('g').call(d3.axisBottom(x))...                    ║
  ║                                                               ║
  ║  Observable Plot (Declarativo - ~10 líneas):                  ║
  ║  Plot.plot({                                                  ║
  ║    marks: [                                                   ║
  ║      Plot.barY(data, { x: 'name', y: 'value', fill: 'blue' }) ║
  ║    ]                                                          ║
  ║  })                                                           ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
-->

<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import * as Plot from "@observablehq/plot";
  import type { CarreraDemanda, TendenciaTemporal } from "$lib/data/education";

  // Props
  export let type: "bar" | "line" | "dot" | "area" = "bar";
  export let data: CarreraDemanda[] | TendenciaTemporal[] = [];
  export let title: string = "";
  export let description: string = "";

  // Referencia al contenedor
  let container: HTMLDivElement;

  // 👇 Función para crear el gráfico con Observable Plot
  function renderChart() {
    if (!container || !data.length) return;

    // Limpiar contenedor
    container.innerHTML = "";

    let plot;

    if (type === "bar") {
      // 👇 Gráfico de barras - ¡Mira lo simple que es comparado con D3!
      plot = Plot.plot({
        width: container.clientWidth,
        height: 300,
        marginBottom: 80,
        marginLeft: 60,
        style: {
          background: "transparent",
          color: "rgba(255,255,255,0.7)",
        },
        x: {
          tickRotate: -45,
          label: null,
        },
        y: {
          label: "Matrícula",
          grid: true,
          tickFormat: (d: number) => `${d / 1000}k`,
        },
        marks: [
          // 👇 Una sola línea para las barras
          Plot.barY(data as CarreraDemanda[], {
            x: "carrera",
            y: "matricula",
            fill: "#8b5cf6",
            tip: true, // ¡Tooltips automáticos!
          }),
          // Regla en y=0
          Plot.ruleY([0]),
        ],
      });
    } else if (type === "line" || type === "area") {
      // 👇 Gráfico de líneas/área
      plot = Plot.plot({
        width: container.clientWidth,
        height: 280,
        marginLeft: 60,
        style: {
          background: "transparent",
          color: "rgba(255,255,255,0.7)",
        },
        x: {
          label: "Año",
          tickFormat: (d: number) => String(d),
        },
        y: {
          label: "Matrícula Total",
          grid: true,
          tickFormat: (d: number) => `${d / 1000000}M`,
        },
        marks: [
          // Área bajo la curva
          Plot.areaY(data as TendenciaTemporal[], {
            x: "año",
            y: "matriculaTotal",
            fill: "#22c55e",
            fillOpacity: 0.2,
            curve: "catmull-rom",
          }),
          // Línea
          Plot.lineY(data as TendenciaTemporal[], {
            x: "año",
            y: "matriculaTotal",
            stroke: "#22c55e",
            strokeWidth: 3,
            curve: "catmull-rom",
          }),
          // Puntos con tooltip
          Plot.dot(data as TendenciaTemporal[], {
            x: "año",
            y: "matriculaTotal",
            fill: "#22c55e",
            r: 6,
            tip: true,
          }),
        ],
      });
    } else if (type === "dot") {
      // 👇 Scatter plot - Empleabilidad vs Crecimiento
      plot = Plot.plot({
        width: container.clientWidth,
        height: 300,
        marginLeft: 60,
        marginBottom: 50,
        style: {
          background: "transparent",
          color: "rgba(255,255,255,0.7)",
        },
        x: {
          label: "Empleabilidad (%)",
          grid: true,
        },
        y: {
          label: "Crecimiento (%)",
          grid: true,
        },
        color: {
          legend: true,
          scheme: "spectral",
        },
        marks: [
          // Puntos con tamaño basado en matrícula
          Plot.dot(data as CarreraDemanda[], {
            x: "empleabilidad",
            y: "crecimiento",
            r: (d: CarreraDemanda) => Math.sqrt(d.matricula) / 20,
            fill: "area",
            tip: true,
            title: (d: CarreraDemanda) =>
              `${d.carrera}\nMatrícula: ${d.matricula.toLocaleString()}`,
          }),
          // Línea de referencia en y=0
          Plot.ruleY([0], {
            stroke: "rgba(255,255,255,0.3)",
            strokeDasharray: "4",
          }),
        ],
      });
    }

    if (plot) {
      container.appendChild(plot);
    }
  }

  // 👇 Renderizar cuando el componente se monte o los datos cambien
  onMount(renderChart);
  afterUpdate(renderChart);
</script>

<div class="chart-wrapper">
  {#if title}
    <h3>{title}</h3>
  {/if}
  {#if description}
    <p class="description">{description}</p>
  {/if}
  <div class="chart-container" bind:this={container}></div>
</div>

<style>
  .chart-wrapper {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
  }

  h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
  }

  .description {
    margin: 0 0 1rem 0;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .chart-container {
    width: 100%;
    min-height: 280px;
  }

  /* Estilos globales para Observable Plot */
  .chart-container :global(svg) {
    font-family: "Inter", sans-serif;
  }

  /* Estilos globales para Observable Plot tooltips */
  .chart-container :global([aria-label="tip"]),
  .chart-container :global(figure > div) {
    background: rgba(15, 15, 35, 0.98) !important;
    border: 1px solid rgba(139, 92, 246, 0.4) !important;
    border-radius: 8px !important;
    color: white !important;
    padding: 10px 14px !important;
    font-size: 12px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
  }

  .chart-container :global([aria-label="tip"] *),
  .chart-container :global(figure > div *) {
    color: white !important;
    background: transparent !important;
  }

  .chart-container :global(table),
  .chart-container :global(th),
  .chart-container :global(td) {
    color: white !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
  }
</style>
