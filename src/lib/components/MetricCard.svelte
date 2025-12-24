<!--
  📦 MetricCard.svelte - Tu primer componente Svelte
  
  ╔═══════════════════════════════════════════════════════════════╗
  ║  COMPARACIÓN REACT vs SVELTE                                  ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║  REACT:                                                       ║
  ║  function MetricCard({ title, value, change }) {              ║
  ║    return (                                                   ║
  ║      <div className="card">                                   ║
  ║        <h3>{title}</h3>                                       ║
  ║        <p className="value">{value}</p>                       ║
  ║        <span className={change >= 0 ? 'up' : 'down'}>         ║
  ║          {change}%                                            ║
  ║        </span>                                                ║
  ║      </div>                                                   ║
  ║    );                                                         ║
  ║  }                                                            ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║  SVELTE: Ve el código abajo ↓                                 ║
  ║  - No necesitas useState, el estado es una variable           ║
  ║  - Los props se definen con "export let"                      ║
  ║  - Los estilos son automáticamente "scoped"                   ║
  ║  - Las clases condicionales usan "class:" directiva          ║
  ╚═══════════════════════════════════════════════════════════════╝
-->

<script lang="ts">
  // 👇 En Svelte, los props se definen con "export let"
  // En React sería: function MetricCard({ title, value, change, icon })
  export let title: string;
  export let value: string | number;
  export let change: number = 0;  // Prop con valor por defecto
  export let icon: string = '📊';
  export let format: 'number' | 'percent' | 'currency' = 'number';

  // 👇 Funciones helper - igual que en React
  function formatValue(val: string | number): string {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'percent':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  }

  // 👇 Variables reactivas computadas con "$:"
  // En React usarías useMemo() para esto
  $: isPositive = change >= 0;
  $: changeIcon = isPositive ? '↑' : '↓';
  $: formattedValue = formatValue(value);
</script>

<!-- 
  👇 El HTML es muy similar a JSX, pero con algunas diferencias:
  - En lugar de className, usas class
  - En lugar de {condition && <el>}, usas {#if condition}
  - Las directivas como class:nombre permiten clases condicionales
-->
<div class="card">
  <div class="card-header">
    <span class="icon">{icon}</span>
    <h3>{title}</h3>
  </div>
  
  <p class="value">{formattedValue}</p>
  
  {#if change !== 0}
    <!-- 👇 class:positive añade la clase "positive" si isPositive es true -->
    <div class="change" class:positive={isPositive} class:negative={!isPositive}>
      <span class="change-icon">{changeIcon}</span>
      <span>{Math.abs(change).toFixed(1)}%</span>
    </div>
  {/if}
</div>

<!-- 
  👇 Los estilos en Svelte son "scoped" por defecto
  Solo afectan a ESTE componente, no a otros
  En React necesitarías CSS Modules o styled-components
-->
<style>
  .card {
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 16px;
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .icon {
    font-size: 1.5rem;
  }

  h3 {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .value {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    line-height: 1.2;
  }

  .change {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .change.positive {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
  }

  .change.negative {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }

  .change-icon {
    font-weight: bold;
  }
</style>
