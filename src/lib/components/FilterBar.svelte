<!--
  🔍 FilterBar.svelte - Filtros Dinámicos
  
  ╔═══════════════════════════════════════════════════════════════╗
  ║  CONCEPTO SVELTE: Eventos Personalizados (dispatch)           ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║  En React para comunicar hijo → padre:                        ║
  ║  <FilterBar onFilterChange={(filters) => setFilters(filters)} ║
  ║                                                               ║
  ║  En Svelte usas createEventDispatcher:                        ║
  ║  dispatch('filterchange', { area: 'Tecnología' })             ║
  ║                                                               ║
  ║  Y en el padre:                                               ║
  ║  <FilterBar on:filterchange={handleFilter} />                 ║
  ╚═══════════════════════════════════════════════════════════════╝
-->

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  // 👇 Lista de áreas únicas para filtrar
  export let areas: string[] = [];

  // 👇 Estado local del componente
  let selectedArea: string = "Todas";
  let searchQuery: string = "";

  // 👇 createEventDispatcher - forma nativa de Svelte para eventos
  const dispatch = createEventDispatcher<{
    filterchange: { area: string; search: string };
  }>();

  // 👇 Reactivo: cada vez que cambia selectedArea o searchQuery, dispara el evento
  $: {
    dispatch("filterchange", {
      area: selectedArea,
      search: searchQuery,
    });
  }

  function selectArea(area: string) {
    selectedArea = area;
  }

  function clearFilters() {
    selectedArea = "Todas";
    searchQuery = "";
  }
</script>

<div class="filter-bar" in:fly={{ y: -20, duration: 300 }}>
  <div class="search-box">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      placeholder="Buscar carrera..."
      bind:value={searchQuery}
    />
    {#if searchQuery}
      <button class="clear-btn" on:click={() => (searchQuery = "")}>✕</button>
    {/if}
  </div>

  <div class="area-filters">
    <button
      class="filter-chip"
      class:active={selectedArea === "Todas"}
      on:click={() => selectArea("Todas")}
    >
      Todas
    </button>
    {#each areas as area}
      <button
        class="filter-chip"
        class:active={selectedArea === area}
        on:click={() => selectArea(area)}
        in:fade={{ delay: 50 }}
      >
        {area}
      </button>
    {/each}
  </div>

  {#if selectedArea !== "Todas" || searchQuery}
    <button class="reset-btn" on:click={clearFilters} transition:fade>
      Limpiar filtros
    </button>
  {/if}
</div>

<style>
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    margin-bottom: 2rem;
  }

  .search-box {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    flex: 1;
    min-width: 200px;
    max-width: 300px;
  }

  .search-icon {
    opacity: 0.5;
  }

  .search-box input {
    background: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 0.9rem;
    width: 100%;
  }

  .search-box input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  .clear-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: rgba(255, 255, 255, 0.6);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .clear-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .area-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-chip {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-chip:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    color: white;
  }

  .filter-chip.active {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    border-color: transparent;
    color: white;
    font-weight: 500;
  }

  .reset-btn {
    background: transparent;
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .reset-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.5);
  }

  @media (max-width: 768px) {
    .filter-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .search-box {
      max-width: 100%;
    }
  }
</style>
