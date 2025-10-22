<template>
  <section class="page">
    <div class="main-header">
      <h3>Visão Geral</h3>
      <div class="status-indicator">
        <span class="status-dot" :class="printerState.status"></span>
        {{ printerState.status }}
      </div>
    </div>
    <div class="home-layout">
      <div class="temp-values">
        <span>
          Bico: {{ printerState.nozzle.current.toFixed(1) }}°C / 
          {{ printerState.nozzle.target }}°C
        </span>
        <span>
          Mesa: {{ printerState.bed.current.toFixed(1) }}°C / 
          {{ printerState.bed.target }}°C
        </span>
      </div>
      <div class="temp-graph">
        (Aqui irá o gráfico de temperatura)
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { printerState } from '../store/printerState';
</script>

<style scoped>
/* Vamos manter o cabeçalho padrão para consistência */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: bold;
    }
  
    .status-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #6c757d; /* Cinza (Offline) */
    }
  
    .status-dot.Operacional {
      background-color: #28a745; /* Verde */
      /* Usa a animação pulse-green */
      animation: pulse-green 2s infinite; 
    }
  
    /* ESTA É A REGRA CORRIGIDA: */
    .status-dot.Printing {
      background-color: #007bff; /* Azul */
       /* Usa a nova animação pulse-blue */
      animation: pulse-blue 2s infinite;
    }
  
    /* Animação de "pulso" VERDE */
    @keyframes pulse-green {
      0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
      100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
    }

    /* NOVA Animação de "pulso" AZUL */
    @keyframes pulse-blue {
      0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
    }

  /* Animação de "pulso" */
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
    100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
  }
</style>