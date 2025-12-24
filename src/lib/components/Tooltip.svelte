<!--
  🎯 Tooltip.svelte - Componente de Tooltip Reutilizable
  
  ╔═══════════════════════════════════════════════════════════════╗
  ║  CONCEPTO SVELTE: Stores                                      ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║  En React para estado global usarías:                         ║
  ║  - Context API + useContext                                   ║
  ║  - Redux, Zustand, Jotai, etc.                                ║
  ║                                                               ║
  ║  En Svelte tienes "Stores" nativos:                           ║
  ║  - writable: estado que puedes leer y escribir                ║
  ║  - readable: estado de solo lectura                           ║
  ║  - derived: estado derivado de otros stores                   ║
  ║                                                               ║
  ║  Para suscribirte a un store, usas el prefijo "$":            ║
  ║  $tooltipStore.visible                                        ║
  ╚═══════════════════════════════════════════════════════════════╝
-->

<script lang="ts">
  import { fade } from "svelte/transition";
  import { tooltipStore } from "$lib/stores/tooltip";

  // 👇 El prefijo "$" automáticamente se suscribe al store
  // En React necesitarías useContext o un hook custom
  $: visible = $tooltipStore.visible;
  $: content = $tooltipStore.content;
  $: x = $tooltipStore.x;
  $: y = $tooltipStore.y;
</script>

{#if visible}
  <!-- 
    👇 transition:fade es una directiva de Svelte
    En React necesitarías framer-motion o CSS Transition Group
  -->
  <div
    class="tooltip"
    style="left: {x}px; top: {y}px;"
    transition:fade={{ duration: 150 }}
  >
    {@html content}
  </div>
{/if}

<style>
  .tooltip {
    position: fixed;
    z-index: 1000;
    background: rgba(15, 15, 35, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 0.75rem 1rem;
    pointer-events: none;
    transform: translate(-50%, -100%) translateY(-10px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    max-width: 250px;
  }

  .tooltip :global(h4) {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
  }

  .tooltip :global(p) {
    margin: 0.25rem 0;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .tooltip :global(.highlight) {
    color: #8b5cf6;
    font-weight: 600;
  }

  .tooltip :global(.positive) {
    color: #22c55e;
  }

  .tooltip :global(.negative) {
    color: #ef4444;
  }
</style>
