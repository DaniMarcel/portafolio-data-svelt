<!--
  🌐 Layout Global con Navegación
  Este layout se aplica a todas las páginas del portafolio
-->

<script lang="ts">
  import { page } from "$app/stores";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();

  // Check if we have profile data
  const shortName = "Daniel Marcel";
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="app">
  <nav class="navbar" class:transparent={$page.url.pathname === "/portfolio"}>
    <a href="/portfolio" class="logo">
      <span class="logo-text">{shortName}</span>
    </a>

    <div class="nav-links">
      <a href="/portfolio" class:active={$page.url.pathname === "/portfolio"}
        >Inicio</a
      >
      <a href="/" class:active={$page.url.pathname === "/"}>Dashboard</a>
      <a href="/denuncias" class:active={$page.url.pathname === "/denuncias"}
        >Denuncias</a
      >
      <a href="/comparison" class:active={$page.url.pathname === "/comparison"}
        >D3 vs Plot</a
      >
      <a href="/portfolio#proyectos">Proyectos</a>
      <a href="/portfolio#contacto" class="contact-btn">Contacto</a>
    </div>
  </nav>

  {@render children()}
</div>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    min-height: 100vh;
    color: white;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    padding-top: 60px;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background: rgba(15, 15, 35, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
  }

  .navbar.transparent {
    background: transparent;
    border-bottom: none;
  }

  .logo {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-text {
    font-weight: 700;
    font-size: 1.25rem;
    background: linear-gradient(135deg, #8b5cf6, #22c55e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: white;
  }

  .contact-btn {
    background: linear-gradient(135deg, #8b5cf6, #6366f1) !important;
    color: white !important;
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 0.75rem 1rem;
    }

    .nav-links {
      gap: 0.75rem;
      font-size: 0.8rem;
    }

    .nav-links a:not(.contact-btn) {
      display: none;
    }
  }

  /* ==========================================
     OBSERVABLE PLOT TOOLTIPS - GLOBAL FIX
     Observable Plot genera tooltips con fondo blanco por defecto.
     Estos estilos fuerzan un tema oscuro.
  ========================================== */

  /* Variable CSS que Observable Plot usa internamente */
  :global(:root) {
    --plot-background: #1a1a2e !important;
  }

  /* Tooltip SVG de Observable Plot - usa fill no background */
  :global([aria-label="tip"]) {
    --plot-background: #1a1a2e !important;
  }

  :global([aria-label="tip"] rect),
  :global([aria-label="tip"] path) {
    fill: #1a1a2e !important;
    stroke: #8b5cf6 !important;
  }

  :global([aria-label="tip"] text),
  :global([aria-label="tip"] tspan) {
    fill: #ffffff !important;
  }

  /* Estilos para la leyenda */
  :global(figure[class] [aria-label="legend"] text) {
    fill: rgba(255, 255, 255, 0.8) !important;
  }
</style>
