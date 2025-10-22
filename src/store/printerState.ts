// src/store/printerState.ts
import { reactive } from 'vue';
import { getStatus } from '../services/api';

// --- A ESTRUTURA DOS DADOS ---
interface ITemperatureState {
  current: number;
  target: number;
}

interface IPrinterState {
  nozzle: ITemperatureState;
  bed: ITemperatureState;
  status: 'Offline' | 'Operacional' | 'Printing';
  isLightOn: boolean; // <-- ADICIONADO
}

// --- O STORE ---
export const printerState = reactive<IPrinterState>({
  nozzle: {
    current: 0.0,
    target: 0,
  },
  bed: {
    current: 0.0,
    target: 0,
  },
  status: 'Offline',
  isLightOn: false, // <-- ADICIONADO (valor inicial)
});

// --- O "POLLER" ---
async function fetchStatusLoop() {
  try {
    const data = await getStatus();
    
    printerState.nozzle = data.nozzle;
    printerState.bed = data.bed;
    printerState.status = data.status;
    // (Opcional: o backend poderia dizer-nos se a luz está ligada)
    // printerState.isLightOn = data.isLightOn; 
    
  } catch (error) {
    console.error('Erro ao buscar status do backend:', error);
    printerState.status = 'Offline';
    printerState.nozzle.current = 0;
    printerState.bed.current = 0;
    printerState.isLightOn = false; // Desliga a luz se a impressora ficar offline
  }
  
  setTimeout(fetchStatusLoop, 2000);
}

export function startStatusPolling() {
  fetchStatusLoop();
}