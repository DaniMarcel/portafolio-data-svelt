// 🏪 tooltip.ts - Store para manejar el Tooltip
//
// ╔═══════════════════════════════════════════════════════════════╗
// ║  SVELTE STORES vs REACT STATE MANAGEMENT                     ║
// ╠═══════════════════════════════════════════════════════════════╣
// ║  REACT (con Zustand):                                        ║
// ║  const useTooltipStore = create((set) => ({                  ║
// ║    visible: false,                                           ║
// ║    show: (content, x, y) => set({ visible: true, ... }),     ║
// ║    hide: () => set({ visible: false }),                      ║
// ║  }));                                                        ║
// ║                                                               ║
// ║  SVELTE (nativo):                                            ║
// ║  Ve el código abajo ↓ - Es prácticamente igual pero incluido ║
// ╚═══════════════════════════════════════════════════════════════╝

import { writable } from 'svelte/store';

interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

// 👇 writable() crea un store con estado inicial
// Similar a create() de Zustand o useState pero global
function createTooltipStore() {
  const { subscribe, set, update } = writable<TooltipState>({
    visible: false,
    content: '',
    x: 0,
    y: 0,
  });

  return {
    subscribe, // Necesario para que Svelte pueda suscribirse con $
    
    // 👇 Método para mostrar el tooltip
    show: (content: string, x: number, y: number) => {
      set({ visible: true, content, x, y });
    },
    
    // 👇 Método para ocultar
    hide: () => {
      update(state => ({ ...state, visible: false }));
    },
  };
}

// 👇 Exportamos una instancia singleton
export const tooltipStore = createTooltipStore();
