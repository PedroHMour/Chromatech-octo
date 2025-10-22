<template>
  <section class="page">
    
    <div class="main-header">
      <h3>Definições</h3>
    </div>

    <div class="settings-container">

      <div class="settings-card">
        <h4>Geral</h4>
        <div class="setting-item">
          <label for="printerName">Nome da Impressora</label>
          <input type="text" id="printerName" v-model="printerName">
        </div>
      </div>

      <div class="settings-card">
        <h4>Funcionalidades</h4>
        <div class="setting-item toggle">
          <label for="autoLight">Ligar luzes ao imprimir</label>
          <label class="switch">
            <input type="checkbox" id="autoLight" v-model="autoLightOnPrint">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="setting-item toggle">
          <label for="autoFan">Ligar ventoinha ao imprimir</label>
          <label class="switch">
            <input type="checkbox" id="autoFan" v-model="autoFanOnPrint" disabled>
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <div class="settings-card">
        <h4>Conexão (Debug)</h4>
        <div class="setting-item">
          <label>Porta Serial</label>
          <input type="text" value="/dev/ttyS0" readonly>
        </div>
        <div class="setting-item">
          <label>Baudrate</label>
          <input type="text" value="115200" readonly>
        </div>
      </div>

      <div class="settings-card">
        <h4>Sistema</h4>
        <div class="setting-item actions">
          <button class="btn btn-warning">Reiniciar Servidor</button>
          <button class="btn btn-danger">Desligar Raspberry Pi</button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Estados locais para os controlos (placeholders)
const printerName = ref('Chromatech v1.0');
const autoLightOnPrint = ref(true);
const autoFanOnPrint = ref(true);

// (Futuramente, estas funções chamariam a API)
// function restartServer() { ... }
// function shutdownPi() { ... }
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.settings-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-card {
  background-color: var(--main-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
}

.settings-card h4 {
  font-size: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.setting-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.setting-item label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #495057;
}

.setting-item input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.setting-item input[readonly] {
  background-color: var(--widget-bg);
  cursor: not-allowed;
}

/* Itens de Ação (Botões) */
.setting-item.actions {
  flex-direction: row;
  gap: 10px;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
}
.btn-warning { background-color: #ffc107; color: #212529; }
.btn-danger { background-color: #dc3545; }


/* --- Estilos do Toggle Switch --- */
.setting-item.toggle {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.setting-item.toggle label {
  margin-bottom: 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}
input:checked + .slider {
  background-color: var(--icon-active);
}
input:focus + .slider {
  box-shadow: 0 0 1px var(--icon-active);
}
input:checked + .slider:before {
  transform: translateX(26px);
}
input:disabled + .slider {
  background-color: #e9ecef;
  cursor: not-allowed;
}
.slider.round { border-radius: 34px; }
.slider.round:before { border-radius: 50%; }
</style>