<!--
  🏠 +page.svelte - Página Principal del Dashboard (v2 - Con Interactividad)
  
  ╔══════════════════════════════════════════════════════════════╗
  ║  FASE 2: Añadimos tooltips, filtros y más interactividad     ║
  ╚══════════════════════════════════════════════════════════════╝
-->

<script lang="ts">
  // 👇 Importar datos y componentes
  import MetricCard from "$lib/components/MetricCard.svelte";
  import Tooltip from "$lib/components/Tooltip.svelte";
  import FilterBar from "$lib/components/FilterBar.svelte";
  import { tooltipStore } from "$lib/stores/tooltip";
  import {
    metricas,
    carrerasDemanda,
    tendenciaTemporal,
    type CarreraDemanda,
  } from "$lib/data/education";
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { fade, fly } from "svelte/transition";

  // 👇 Referencias a elementos DOM
  let chartContainer: HTMLDivElement;
  let lineChartContainer: HTMLDivElement;

  // 👇 Estado para filtros
  let filteredData: CarreraDemanda[] = carrerasDemanda;
  let currentFilters = { area: "Todas", search: "" };

  // 👇 Obtener áreas únicas para los filtros
  $: uniqueAreas = [...new Set(carrerasDemanda.map((c) => c.area))];

  // 👇 Efecto reactivo: cuando cambian los filtros, actualiza los datos
  // Esto es como useEffect con dependencias [currentFilters]
  $: {
    filteredData = carrerasDemanda.filter((carrera) => {
      const matchesArea =
        currentFilters.area === "Todas" || carrera.area === currentFilters.area;
      const matchesSearch = carrera.carrera
        .toLowerCase()
        .includes(currentFilters.search.toLowerCase());
      return matchesArea && matchesSearch;
    });
  }

  // 👇 Reconstruir gráfico cuando cambian los datos filtrados
  $: if (chartContainer && filteredData) {
    createBarChart(filteredData.slice(0, 6));
  }

  // 👇 Handler para el evento de filtro
  function handleFilterChange(
    event: CustomEvent<{ area: string; search: string }>
  ) {
    currentFilters = event.detail;
  }

  onMount(() => {
    createBarChart(filteredData.slice(0, 6));
    createLineChart();
  });

  // 📊 Gráfico de Barras con Tooltips
  function createBarChart(data: CarreraDemanda[]) {
    if (!chartContainer) return;

    const margin = { top: 20, right: 30, bottom: 100, left: 60 };
    const width = chartContainer.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(chartContainer).selectAll("*").remove();

    const svg = d3
      .select(chartContainer)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.carrera))
      .range([0, width])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.matricula) ?? 0])
      .nice()
      .range([height, 0]);

    // Gradiente
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "barGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#8b5cf6");
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#6366f1");

    // 👇 Barras con eventos de mouse para tooltips
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.carrera) ?? 0)
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "url(#barGradient)")
      .attr("rx", 4)
      .style("cursor", "pointer")
      // 👇 Eventos de mouse para mostrar/ocultar tooltip
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill", "#a78bfa")
          .attr("transform", "scale(1.02)");

        const content = `
          <h4>${d.carrera}</h4>
          <p>Área: <span class="highlight">${d.area}</span></p>
          <p>Matrícula: <span class="highlight">${d.matricula.toLocaleString()}</span></p>
          <p>Crecimiento: <span class="${d.crecimiento >= 0 ? "positive" : "negative"}">${d.crecimiento >= 0 ? "+" : ""}${d.crecimiento}%</span></p>
          <p>Empleabilidad: <span class="positive">${d.empleabilidad}%</span></p>
        `;
        tooltipStore.show(content, event.clientX, event.clientY);
      })
      .on("mousemove", function (event, d) {
        const content = `
          <h4>${d.carrera}</h4>
          <p>Área: <span class="highlight">${d.area}</span></p>
          <p>Matrícula: <span class="highlight">${d.matricula.toLocaleString()}</span></p>
        `;
        tooltipStore.show(content, event.clientX, event.clientY);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("fill", "url(#barGradient)")
          .attr("transform", "scale(1)");
        tooltipStore.hide();
      })
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr("y", (d) => y(d.matricula))
      .attr("height", (d) => height - y(d.matricula));

    // Ejes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "rgba(255,255,255,0.7)")
      .style("font-size", "11px");

    svg
      .append("g")
      .call(d3.axisLeft(y).tickFormat((d) => `${Number(d) / 1000}k`))
      .selectAll("text")
      .style("fill", "rgba(255,255,255,0.7)");

    svg
      .selectAll(".domain, .tick line")
      .style("stroke", "rgba(255,255,255,0.2)");
  }

  // 📈 Gráfico de Líneas con Tooltips
  function createLineChart() {
    if (!lineChartContainer) return;

    const data = tendenciaTemporal;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = lineChartContainer.clientWidth - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    d3.select(lineChartContainer).selectAll("*").remove();

    const svg = d3
      .select(lineChartContainer)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([2020, 2024]).range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.matriculaTotal) ?? 0])
      .nice()
      .range([height, 0]);

    // Área
    const area = d3
      .area<(typeof data)[0]>()
      .x((d) => x(d.año))
      .y0(height)
      .y1((d) => y(d.matriculaTotal))
      .curve(d3.curveMonotoneX);

    const areaGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "areaGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    areaGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#22c55e")
      .attr("stop-opacity", 0.3);
    areaGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#22c55e")
      .attr("stop-opacity", 0.05);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#areaGradient)")
      .attr("d", area);

    // Línea
    const line = d3
      .line<(typeof data)[0]>()
      .x((d) => x(d.año))
      .y((d) => y(d.matriculaTotal))
      .curve(d3.curveMonotoneX);

    const path = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#22c55e")
      .attr("stroke-width", 3)
      .attr("d", line);

    const pathLength = path.node()?.getTotalLength() ?? 0;
    path
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(1500)
      .attr("stroke-dashoffset", 0);

    // 👇 Puntos interactivos con tooltips
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.año))
      .attr("cy", (d) => y(d.matriculaTotal))
      .attr("r", 0)
      .attr("fill", "#22c55e")
      .attr("stroke", "#1a1a2e")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", 10)
          .attr("fill", "#4ade80");

        const content = `
          <h4>Año ${d.año}</h4>
          <p>Total: <span class="highlight">${(d.matriculaTotal / 1000000).toFixed(2)}M</span></p>
          <p>Universidades: ${(d.universidades / 1000).toFixed(0)}k</p>
          <p>Institutos: ${(d.institutos / 1000).toFixed(0)}k</p>
          <p>CFTs: ${(d.cfts / 1000).toFixed(0)}k</p>
        `;
        tooltipStore.show(content, event.clientX, event.clientY);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", 6)
          .attr("fill", "#22c55e");
        tooltipStore.hide();
      })
      .transition()
      .delay((_, i) => 1500 + i * 100)
      .duration(300)
      .attr("r", 6);

    // Ejes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => String(d)))
      .selectAll("text")
      .style("fill", "rgba(255,255,255,0.7)");

    svg
      .append("g")
      .call(d3.axisLeft(y).tickFormat((d) => `${Number(d) / 1000000}M`))
      .selectAll("text")
      .style("fill", "rgba(255,255,255,0.7)");

    svg
      .selectAll(".domain, .tick line")
      .style("stroke", "rgba(255,255,255,0.2)");
  }
</script>

<svelte:head>
  <title>Dashboard Educación | Svelte + D3.js</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- 👇 Tooltip global (se muestra sobre todo) -->
<Tooltip />

<main>
  <header in:fly={{ y: -30, duration: 500 }}>
    <div class="header-content">
      <h1>📚 Dashboard de Educación Superior</h1>
      <p class="subtitle">
        Visualización interactiva con <span class="tech">Svelte</span> +
        <span class="tech">D3.js</span>
      </p>
      <a href="/comparison" class="comparison-link">
        Ver comparación D3.js vs Observable Plot →
      </a>
    </div>
  </header>

  <!-- Métricas principales -->
  <section class="metrics-grid" in:fly={{ y: 20, duration: 500, delay: 100 }}>
    <MetricCard
      title="Total Estudiantes"
      value={metricas.totalEstudiantes}
      change={metricas.crecimientoAnual}
      icon="🎓"
    />
    <MetricCard
      title="Instituciones"
      value={metricas.totalInstituciones}
      change={2.1}
      icon="🏛️"
    />
    <MetricCard
      title="Tasa Retención"
      value={metricas.tasaRetencionPromedio}
      format="percent"
      change={1.3}
      icon="📈"
    />
    <MetricCard
      title="Crecimiento Anual"
      value={metricas.crecimientoAnual}
      format="percent"
      change={0.5}
      icon="🚀"
    />
  </section>

  <!-- 👇 NUEVO: Barra de filtros -->
  <FilterBar areas={uniqueAreas} on:filterchange={handleFilterChange} />

  <!-- Gráficos -->
  <section class="charts-section" in:fly={{ y: 20, duration: 500, delay: 200 }}>
    <div class="chart-card">
      <h2>📊 Matrícula por Carrera</h2>
      <p class="chart-description">
        {#if currentFilters.area !== "Todas"}
          Mostrando: <strong>{currentFilters.area}</strong>
        {:else}
          Top 6 carreras con mayor demanda
        {/if}
        {#if currentFilters.search}
          | Búsqueda: "{currentFilters.search}"
        {/if}
      </p>
      <div class="chart-container" bind:this={chartContainer}></div>
    </div>

    <div class="chart-card">
      <h2>📈 Tendencia de Matrícula Total</h2>
      <p class="chart-description">
        Evolución 2020-2024 (pasa el mouse sobre los puntos)
      </p>
      <div class="chart-container" bind:this={lineChartContainer}></div>
    </div>
  </section>

  <!-- Tabla de carreras filtradas -->
  <section class="table-section" in:fly={{ y: 20, duration: 500, delay: 300 }}>
    <h2>🎯 Carreras con Mayor Proyección</h2>
    <p class="table-count">
      Mostrando <strong>{filteredData.length}</strong> de {carrerasDemanda.length}
      carreras
    </p>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Carrera</th>
            <th>Área</th>
            <th>Matrícula</th>
            <th>Crecimiento</th>
            <th>Empleabilidad</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredData as carrera (carrera.carrera)}
            <tr in:fade={{ duration: 200 }}>
              <td class="carrera-name">{carrera.carrera}</td>
              <td>
                <span class="area-badge">{carrera.area}</span>
              </td>
              <td>{carrera.matricula.toLocaleString()}</td>
              <td>
                <span
                  class="growth"
                  class:positive={carrera.crecimiento > 0}
                  class:negative={carrera.crecimiento < 0}
                >
                  {carrera.crecimiento > 0 ? "↑" : "↓"}
                  {Math.abs(carrera.crecimiento)}%
                </span>
              </td>
              <td>
                <div class="empleabilidad-bar">
                  <div
                    class="bar-fill"
                    style="width: {carrera.empleabilidad}%"
                  ></div>
                  <span>{carrera.empleabilidad}%</span>
                </div>
              </td>
            </tr>
          {/each}
          {#if filteredData.length === 0}
            <tr>
              <td colspan="5" class="no-results">
                No se encontraron carreras con los filtros actuales
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
    min-height: 100vh;
    color: white;
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
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }

  .tech {
    color: #8b5cf6;
    font-weight: 600;
  }

  .comparison-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.2) 0%,
      rgba(99, 102, 241, 0.2) 100%
    );
    border: 1px solid rgba(139, 92, 246, 0.4);
    border-radius: 12px;
    color: #a78bfa;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .comparison-link:hover {
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.3) 0%,
      rgba(99, 102, 241, 0.3) 100%
    );
    border-color: rgba(139, 92, 246, 0.6);
    color: white;
    transform: translateY(-2px);
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .charts-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .chart-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
  }

  .chart-card h2 {
    margin: 0 0 0.25rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .chart-description {
    margin: 0 0 1.5rem 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }

  .chart-container {
    width: 100%;
    min-height: 300px;
  }

  .table-section {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
  }

  .table-section h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }

  .table-count {
    margin: 0 0 1.5rem 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }

  .table-container {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .carrera-name {
    font-weight: 600;
  }

  .area-badge {
    background: rgba(139, 92, 246, 0.2);
    color: #a78bfa;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .growth {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .growth.positive {
    color: #22c55e;
  }

  .growth.negative {
    color: #ef4444;
  }

  .empleabilidad-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .bar-fill {
    height: 8px;
    background: linear-gradient(90deg, #8b5cf6, #22c55e);
    border-radius: 4px;
    min-width: 60px;
    max-width: 100px;
    transition: width 0.3s ease;
  }

  tbody tr {
    transition: background 0.2s ease;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .no-results {
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    padding: 2rem !important;
  }

  @media (max-width: 768px) {
    main {
      padding: 1rem;
    }

    h1 {
      font-size: 1.75rem;
    }

    .charts-section {
      grid-template-columns: 1fr;
    }
  }
</style>
