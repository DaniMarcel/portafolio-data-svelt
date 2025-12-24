<!--
  📈 Página de Comparación: D3.js vs Observable Plot
  
  Esta página te muestra la diferencia entre ambos enfoques
  para que puedas elegir cuál usar en cada situación.
-->

<script lang="ts">
  import PlotChart from "$lib/components/PlotChart.svelte";
  import { carrerasDemanda, tendenciaTemporal } from "$lib/data/education";
  import { fly, fade } from "svelte/transition";
</script>

<svelte:head>
  <title>D3.js vs Observable Plot | Comparación</title>
</svelte:head>

<main>
  <header in:fly={{ y: -30, duration: 500 }}>
    <a href="/" class="back-link">← Volver al Dashboard</a>
    <h1>📊 D3.js vs Observable Plot</h1>
    <p class="subtitle">Comparación de enfoques para visualización de datos</p>
  </header>

  <!-- Explicación -->
  <section class="explanation" in:fade={{ delay: 200 }}>
    <div class="comparison-cards">
      <div class="card d3">
        <h3>🔧 D3.js</h3>
        <p class="approach">Enfoque <strong>Imperativo</strong></p>
        <ul>
          <li>Control total sobre cada elemento</li>
          <li>Más líneas de código</li>
          <li>Animaciones personalizadas</li>
          <li>Curva de aprendizaje alta</li>
          <li>Ideal para visualizaciones únicas</li>
        </ul>
        <div class="code-example">
          <pre><code
              >// ~50 líneas para un gráfico de barras
const svg = d3.select(el).append('svg');
const x = d3.scaleBand().domain(...);
const y = d3.scaleLinear().domain(...);
svg.selectAll('rect')
   .data(data)
   .enter()
   .append('rect')
   .attr('x', d => x(d.name))
   .attr('y', d => y(d.value))
   // ...más atributos</code
            ></pre>
        </div>
      </div>

      <div class="card plot">
        <h3>⚡ Observable Plot</h3>
        <p class="approach">Enfoque <strong>Declarativo</strong></p>
        <ul>
          <li>API simple y expresiva</li>
          <li>Menos código, más productivo</li>
          <li>Tooltips automáticos</li>
          <li>Curva de aprendizaje baja</li>
          <li>Ideal para análisis exploratorio</li>
        </ul>
        <div class="code-example">
          <pre><code
              >// ~10 líneas para el mismo gráfico
Plot.plot({"{"}
  marks: [
    Plot.barY(data, {"{"}
      x: 'name',
      y: 'value',
      fill: 'steelblue',
      tip: true
    {"}"})
  ]
{"}"})</code
            ></pre>
        </div>
      </div>
    </div>
  </section>

  <!-- Gráficos con Observable Plot -->
  <section class="charts-section" in:fly={{ y: 20, delay: 300 }}>
    <h2>🚀 Gráficos con Observable Plot</h2>
    <p class="section-description">Mismos datos, menos código</p>

    <div class="charts-grid">
      <PlotChart
        type="bar"
        data={carrerasDemanda.slice(0, 6)}
        title="📊 Matrícula por Carrera"
        description="Gráfico de barras con tooltips automáticos"
      />

      <PlotChart
        type="line"
        data={tendenciaTemporal}
        title="📈 Tendencia Temporal"
        description="Línea con área y puntos interactivos"
      />
    </div>

    <!-- Scatter Plot adicional -->
    <div class="full-width-chart">
      <PlotChart
        type="dot"
        data={carrerasDemanda}
        title="🎯 Empleabilidad vs Crecimiento"
        description="Tamaño de burbuja = cantidad de matrícula. Color = área de estudio."
      />
    </div>
  </section>

  <!-- Cuándo usar cada uno -->
  <section class="when-to-use" in:fly={{ y: 20, delay: 400 }}>
    <h2>🤔 ¿Cuándo usar cada uno?</h2>

    <div class="use-cases">
      <div class="use-case">
        <h4>Usa D3.js cuando...</h4>
        <ul>
          <li>Necesitas animaciones complejas personalizadas</li>
          <li>Quieres control total sobre el SVG</li>
          <li>Estás creando una visualización única/artística</li>
          <li>El rendimiento con millones de puntos es crítico</li>
        </ul>
      </div>

      <div class="use-case">
        <h4>Usa Observable Plot cuando...</h4>
        <ul>
          <li>Necesitas explorar datos rápidamente</li>
          <li>Quieres prototipar visualizaciones</li>
          <li>El tiempo de desarrollo es limitado</li>
          <li>Los gráficos estándar son suficientes</li>
        </ul>
      </div>
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
    margin-bottom: 2rem;
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
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }

  .comparison-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
  }

  .card.d3 {
    border-top: 3px solid #f97316;
  }

  .card.plot {
    border-top: 3px solid #22c55e;
  }

  .card h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
  }

  .approach {
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
  }

  .card ul {
    margin: 0 0 1.5rem 0;
    padding-left: 1.2rem;
  }

  .card li {
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }

  .code-example {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    padding: 1rem;
    overflow-x: auto;
  }

  .code-example pre {
    margin: 0;
  }

  .code-example code {
    font-family: "Fira Code", monospace;
    font-size: 0.75rem;
    color: #a5b4fc;
    white-space: pre;
  }

  .charts-section h2,
  .when-to-use h2 {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .section-description {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 2rem;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .full-width-chart {
    margin-bottom: 3rem;
  }

  .when-to-use {
    margin-bottom: 2rem;
  }

  .use-cases {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .use-case {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.5rem;
  }

  .use-case h4 {
    margin: 0 0 1rem 0;
    color: #a5b4fc;
    font-size: 1rem;
  }

  .use-case ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  .use-case li {
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }

    .comparison-cards,
    .charts-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
