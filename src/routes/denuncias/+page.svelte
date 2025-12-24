<!--
  📊 Dashboard de Denuncias Educacionales 2025
  Fuente: Superintendencia de Educación de Chile
-->

<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import * as Plot from "@observablehq/plot";
  import {
    denunciasPorRegion,
    denunciasPorAmbito,
    denunciasPorTema,
    denunciasPorEstado,
    denunciasPorMes,
    resumenGeneral,
    coloresAmbito,
    coloresEstado,
  } from "$lib/data/denuncias";
  import { fly, fade } from "svelte/transition";

  // Referencias a contenedores de gráficos
  let regionChartEl: HTMLDivElement;
  let ambitoChartEl: HTMLDivElement;
  let temaChartEl: HTMLDivElement;
  let estadoChartEl: HTMLDivElement;
  let tendenciaChartEl: HTMLDivElement;

  onMount(() => {
    createRegionChart();
    createAmbitoChart();
    createTemaChart();
    createEstadoChart();
    createTendenciaChart();
  });

  // Gráfico de barras horizontales - Denuncias por región
  function createRegionChart() {
    const plot = Plot.plot({
      marginLeft: 120,
      marginRight: 60,
      height: 450,
      style: {
        background: "transparent",
        color: "white",
        fontSize: "12px",
      },
      x: {
        label: "Número de denuncias",
        grid: true,
      },
      y: {
        label: null,
      },
      marks: [
        Plot.barX(denunciasPorRegion, {
          y: "region",
          x: "total",
          fill: "#8b5cf6",
          sort: { y: "x", reverse: true },
          tip: true,
        }),
        Plot.ruleX([0]),
      ],
    });
    regionChartEl.innerHTML = "";
    regionChartEl.appendChild(plot);
  }

  // Gráfico de barras horizontales - Denuncias por ámbito
  function createAmbitoChart() {
    const plot = Plot.plot({
      marginLeft: 150,
      marginRight: 60,
      height: 260,
      style: {
        background: "transparent",
        color: "white",
        fontSize: "12px",
      },
      x: {
        label: "% de denuncias",
        grid: true,
        tickFormat: (d: number) => `${d}%`,
      },
      y: {
        label: null,
      },
      marks: [
        Plot.barX(denunciasPorAmbito, {
          y: "ambito",
          x: "porcentaje",
          fill: (d) => coloresAmbito[d.ambito] || "#8b5cf6",
          sort: { y: "x", reverse: true },
          tip: true,
        }),
        Plot.text(denunciasPorAmbito, {
          y: "ambito",
          x: "porcentaje",
          text: (d) => `${d.porcentaje}%`,
          dx: 25,
          fill: "white",
          fontSize: 11,
        }),
        Plot.ruleX([0]),
      ],
    });
    ambitoChartEl.innerHTML = "";
    ambitoChartEl.appendChild(plot);
  }

  // Gráfico de barras - Top temas
  function createTemaChart() {
    const plot = Plot.plot({
      marginLeft: 200,
      marginRight: 40,
      height: 400,
      style: {
        background: "transparent",
        color: "white",
        fontSize: "11px",
      },
      x: {
        label: "Número de denuncias",
        grid: true,
      },
      y: {
        label: null,
      },
      color: {
        legend: true,
      },
      marks: [
        Plot.barX(denunciasPorTema, {
          y: "tema",
          x: "total",
          fill: "ambito",
          sort: { y: "x", reverse: true },
          tip: true,
        }),
        Plot.ruleX([0]),
      ],
    });
    temaChartEl.innerHTML = "";
    temaChartEl.appendChild(plot);
  }

  // Gráfico de barras horizontales - Estados
  function createEstadoChart() {
    // Calcular porcentajes
    const dataConPorcentaje = denunciasPorEstado.map((d) => ({
      ...d,
      porcentaje: parseFloat(
        ((d.total / resumenGeneral.totalDenuncias) * 100).toFixed(1)
      ),
    }));

    const plot = Plot.plot({
      marginLeft: 100,
      marginRight: 60,
      height: 180,
      style: {
        background: "transparent",
        color: "white",
        fontSize: "12px",
      },
      x: {
        label: "Cantidad",
        grid: true,
      },
      y: {
        label: null,
      },
      marks: [
        Plot.barX(dataConPorcentaje, {
          y: "estado",
          x: "total",
          fill: (d) => coloresEstado[d.estado] || "#8b5cf6",
          sort: { y: "x", reverse: true },
          tip: true,
        }),
        Plot.text(dataConPorcentaje, {
          y: "estado",
          x: "total",
          text: (d) => `${d.porcentaje}%`,
          dx: 30,
          fill: "white",
          fontSize: 11,
        }),
        Plot.ruleX([0]),
      ],
    });
    estadoChartEl.innerHTML = "";
    estadoChartEl.appendChild(plot);
  }

  // Gráfico de líneas - Tendencia mensual
  function createTendenciaChart() {
    const plot = Plot.plot({
      marginLeft: 60,
      marginRight: 20,
      height: 300,
      style: {
        background: "transparent",
        color: "white",
        fontSize: "12px",
      },
      x: {
        label: "Mes",
        tickFormat: (d: number) =>
          denunciasPorMes[d - 1]?.mesNombre.slice(0, 3) || "",
      },
      y: {
        label: "Denuncias",
        grid: true,
      },
      marks: [
        Plot.areaY(denunciasPorMes, {
          x: "mes",
          y: "total",
          fill: "#8b5cf6",
          fillOpacity: 0.3,
          curve: "catmull-rom",
        }),
        Plot.lineY(denunciasPorMes, {
          x: "mes",
          y: "total",
          stroke: "#8b5cf6",
          strokeWidth: 3,
          curve: "catmull-rom",
        }),
        Plot.dot(denunciasPorMes, {
          x: "mes",
          y: "total",
          fill: "#8b5cf6",
          r: 6,
          tip: true,
        }),
      ],
    });
    tendenciaChartEl.innerHTML = "";
    tendenciaChartEl.appendChild(plot);
  }
</script>

<svelte:head>
  <title>Denuncias Educación 2025 | Daniel Marcel</title>
</svelte:head>

<main in:fade={{ duration: 300 }}>
  <!-- Header -->
  <header in:fly={{ y: -20, duration: 400 }}>
    <a href="/portfolio" class="back-link">← Volver al Portafolio</a>
    <h1>📊 Dashboard de Denuncias Educacionales</h1>
    <p class="subtitle">
      Análisis de denuncias recibidas por la Superintendencia de Educación -
      Chile 2025
    </p>
    <p class="data-source">
      Fuente: Datos públicos Superintendencia de Educación
    </p>
  </header>

  <!-- Métricas principales -->
  <section class="metrics" in:fly={{ y: 20, delay: 100, duration: 400 }}>
    <div class="metric-card">
      <span class="metric-icon">📋</span>
      <span class="metric-value"
        >{resumenGeneral.totalDenuncias.toLocaleString()}</span
      >
      <span class="metric-label">Total Denuncias</span>
    </div>
    <div class="metric-card">
      <span class="metric-icon">⏳</span>
      <span class="metric-value"
        >{resumenGeneral.denunciasEnProceso.toLocaleString()}</span
      >
      <span class="metric-label">En Proceso</span>
    </div>
    <div class="metric-card">
      <span class="metric-icon">✅</span>
      <span class="metric-value"
        >{resumenGeneral.denunciasCerradas.toLocaleString()}</span
      >
      <span class="metric-label">Cerradas</span>
    </div>
    <div class="metric-card highlight">
      <span class="metric-icon">⚠️</span>
      <span class="metric-value">{resumenGeneral.porcentajeConvivencia}%</span>
      <span class="metric-label">Convivencia Escolar</span>
    </div>
  </section>

  <!-- Gráficos principales -->
  <div class="charts-grid">
    <!-- Denuncias por región -->
    <section class="chart-section full-width" in:fly={{ y: 20, delay: 200 }}>
      <h2>🗺️ Denuncias por Región</h2>
      <p class="chart-description">
        Distribución geográfica de denuncias en el territorio nacional
      </p>
      <div class="chart-container" bind:this={regionChartEl}></div>
    </section>

    <!-- Denuncias por ámbito -->
    <section class="chart-section" in:fly={{ y: 20, delay: 300 }}>
      <h2>📁 Por Ámbito</h2>
      <p class="chart-description">Clasificación por tipo de problemática</p>
      <div class="chart-container" bind:this={ambitoChartEl}></div>
    </section>

    <!-- Denuncias por estado -->
    <section class="chart-section" in:fly={{ y: 20, delay: 350 }}>
      <h2>📊 Por Estado</h2>
      <p class="chart-description">Estado actual de las denuncias</p>
      <div class="chart-container" bind:this={estadoChartEl}></div>
    </section>

    <!-- Tendencia mensual -->
    <section class="chart-section full-width" in:fly={{ y: 20, delay: 400 }}>
      <h2>📈 Tendencia Mensual 2025</h2>
      <p class="chart-description">
        Evolución del número de denuncias a lo largo del año
      </p>
      <div class="chart-container" bind:this={tendenciaChartEl}></div>
    </section>

    <!-- Top temas -->
    <section class="chart-section full-width" in:fly={{ y: 20, delay: 450 }}>
      <h2>🔥 Temas Más Denunciados</h2>
      <p class="chart-description">Los 10 tipos de denuncia más frecuentes</p>
      <div class="chart-container" bind:this={temaChartEl}></div>
    </section>
  </div>

  <!-- Insights -->
  <section class="insights" in:fly={{ y: 20, delay: 500 }}>
    <h2>💡 Insights Principales</h2>
    <div class="insights-grid">
      <div class="insight-card">
        <span class="insight-icon">🏙️</span>
        <h3>Concentración Metropolitana</h3>
        <p>
          La Región Metropolitana concentra el 39% de todas las denuncias,
          seguida por Biobío y Valparaíso.
        </p>
      </div>
      <div class="insight-card">
        <span class="insight-icon">🤝</span>
        <h3>Convivencia Escolar</h3>
        <p>
          El 66% de las denuncias están relacionadas con problemas de
          convivencia, principalmente maltrato entre estudiantes.
        </p>
      </div>
      <div class="insight-card">
        <span class="insight-icon">📅</span>
        <h3>Pico en Abril</h3>
        <p>
          Abril presenta el mayor número de denuncias, coincidiendo con el
          inicio pleno del año escolar.
        </p>
      </div>
    </div>
  </section>
</main>

<style>
  /* Estilos globales para tooltips de Observable Plot */
  :global([class*="plot-"] [role="tooltip"]),
  :global(.plot-tip),
  :global(figure[class*="plot"] [role="tooltip"]) {
    background: rgba(15, 15, 35, 0.95) !important;
    color: white !important;
    border: 1px solid rgba(139, 92, 246, 0.4) !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    font-size: 12px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
  }

  :global([class*="plot-"] [role="tooltip"] *),
  :global(.plot-tip *) {
    color: white !important;
    background: transparent !important;
  }

  /* Estilos para la tabla dentro del tooltip */
  :global(figure svg + div),
  :global(figure > div:last-child) {
    background: rgba(15, 15, 35, 0.95) !important;
    color: white !important;
    border: 1px solid rgba(139, 92, 246, 0.4) !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
  }

  :global(figure svg + div *),
  :global(figure > div:last-child *) {
    color: white !important;
  }

  main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .back-link {
    display: inline-block;
    color: #8b5cf6;
    text-decoration: none;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #a78bfa;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    margin: 0.5rem 0 0.25rem 0;
  }

  .data-source {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.85rem;
    margin: 0;
  }

  /* Métricas */
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .metric-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .metric-card.highlight {
    border-color: rgba(239, 68, 68, 0.4);
    background: rgba(239, 68, 68, 0.1);
  }

  .metric-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: white;
  }

  .metric-label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }

  /* Charts Grid */
  .charts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .chart-section {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 1.5rem;
  }

  .chart-section.full-width {
    grid-column: span 2;
  }

  .chart-section h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .chart-description {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
  }

  .chart-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  /* Insights */
  .insights {
    margin-top: 3rem;
  }

  .insights h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .insight-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
  }

  .insight-icon {
    font-size: 2rem;
  }

  .insight-card h3 {
    margin: 0.75rem 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .insight-card p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 900px) {
    .charts-grid {
      grid-template-columns: 1fr;
    }

    .chart-section.full-width {
      grid-column: span 1;
    }

    h1 {
      font-size: 1.75rem;
    }
  }
</style>
