<template>
  <section class="page">
    
    <div class="main-header">
      <h3>Ajustes e Mistura de Filamento</h3>
    </div>

    <div class="adjust-layout">

      <div class="adjust-card">
        <h4>Ajustes da Impressão (Em Tempo Real)</h4>
        
        <div class="adjust-control">
          <label for="feedRate">Velocidade (Feed Rate)</label>
          <div class="control-inputs">
            <input type="range" id="feedRate" min="50" max="200" v-model.number="feedRate">
            <input type="number" min="50" max="200" v-model.number="feedRate">
            <span>%</span>
          </div>
        </div>

        <div class="adjust-control">
          <label for="flowRate">Fluxo (Flow Rate)</label>
          <div class="control-inputs">
            <input type="range" id="flowRate" min="80" max="120" v-model.number="flowRate">
            <input type="number" min="80" max="120" v-model.number="flowRate">
            <span>%</span>
          </div>
        </div>

        <div class="adjust-control">
          <label for="fanSpeed">Ventoinha da Peça</label>
          <div class="control-inputs">
            <input type="range" id="fanSpeed" min="0" max="100" v-model.number="fanSpeed">
            <input type="number" min="0" max="100" v-model.number="fanSpeed">
            <span>%</span>
          </div>
        </div>
        
        <button class="apply-button" @click="aplicarAjustes">Aplicar Ajustes</button>
      </div>

      <div class="adjust-card">
        <h4>Mistura de Filamento</h4>
        <p>Defina a proporção de cada extrusor. A soma total deve ser 100%.</p>
        
        <div class="extruder-control extruder-red">
          <label for="ext1">Extrusor 1 (Vermelho)</label>
          <div class="control-inputs">
            <input type="range" id="ext1" min="0" max="100" v-model.number="extrusor1">
            <input type="number" min="0" max="100" v-model.number="extrusor1">
            <span>%</span>
          </div>
        </div>
        
        <div class="extruder-control extruder-yellow">
          <label for="ext2">Extrusor 2 (Amarelo)</label>
          <div class="control-inputs">
            <input type="range" id="ext2" min="0" max="100" v-model.number="extrusor2">
            <input type="number" min="0" max="100" v-model.number="extrusor2">
            <span>%</span>
          </div>
        </div>
        
        <div class="extruder-control extruder-blue">
          <label for="ext3">Extrusor 3 (Azul)</label>
          <div class="control-inputs">
            <input type="range" id="ext3" min="0" max="100" v-model.number="extrusor3">
            <input type="number" min="0" max="100" v-model.number="extrusor3">
            <span>%</span>
          </div>
        </div>
        
        <div class="mixer-summary">
          <h3>Total: 
            <span :class="{ 'invalid': !isMixValid }">
              {{ totalPercentage }}%
            </span>
          </h3>

          <p class="warning" v-if="!isMixValid">
            A soma deve ser exatamente 100%.
          </p>

          <button 
            class="apply-button" 
            :disabled="!isMixValid || isMixLoading" 
            @click="aplicarMistura"
          >
            <span v-if="isMixLoading">A aplicar...</span>
            <span v-else>Aplicar Mistura</span>
          </button>
        </div>
      </div>
      
    </div> </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { applyMix } from '../services/api'; 
// (Futuramente: import { applyAdjustments } from '@/services/api';)

// --- ESTADO: AJUSTES PADRÃO ---
const feedRate = ref(100);
const flowRate = ref(100);
const fanSpeed = ref(100);

// --- ESTADO: MISTURA ---
const extrusor1 = ref(34);
const extrusor2 = ref(33);
const extrusor3 = ref(33);
const isMixLoading = ref(false);

// --- COMPUTED: MISTURA ---
const totalPercentage = computed(() => {
  return extrusor1.value + extrusor2.value + extrusor3.value;
});

const isMixValid = computed(() => {
  return totalPercentage.value === 100;
});


// --- AÇÕES ---
async function aplicarAjustes() {
  // (Função placeholder para os ajustes padrão)
  console.log('Aplicando Ajustes:', {
    feed: feedRate.value,
    flow: flowRate.value,
    fan: fanSpeed.value
  });
  alert('Ajustes (ainda não) aplicados!');
  // Futuramente, chamaria: await applyAdjustments(...)
}

async function aplicarMistura() {
  if (!isMixValid.value) return; 
  isMixLoading.value = true;
  try {
    const data = await applyMix({
      ext1: extrusor1.value,
      ext2: extrusor2.value,
      ext3: extrusor3.value,
    });
    console.log('Resposta do backend:', data.message);
    alert('Mistura aplicada com sucesso!');
  } catch (error) {
    console.error(error);
    alert('Erro ao aplicar mistura.');
  } finally {
    isMixLoading.value = false;
  }
}
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

/* Layout de 2 colunas para as secções */
.adjust-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Cartão base para cada secção */
.adjust-card {
  background-color: var(--main-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
}
.adjust-card h4 {
  font-size: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}
.adjust-card p {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 15px;
}


/* Controlos (Padrão e Mistura) */
.adjust-control,
.extruder-control {
  margin-bottom: 20px;
}

.adjust-control label,
.extruder-control label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.control-inputs {
  display: flex;
  align-items: center;
  gap: 15px;
}

.control-inputs input[type="range"] {
  flex-grow: 1;
  cursor: pointer;
  /* A propriedade 'accent-color' é a magia! */
  /* Ela é definida pelas classes específicas abaixo */
  height: 8px;
  border-radius: 4px;
}

.control-inputs input[type="number"] {
  width: 70px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  text-align: center;
}
.control-inputs span {
  font-weight: bold;
}

/* --- ESTILOS DE COR DOS SLIDERS --- */
/* Esta é a forma moderna e prática de colorir sliders */
.extruder-red input[type="range"] { accent-color: #dc3545; }
.extruder-yellow input[type="range"] { accent-color: #ffc107; }
.extruder-blue input[type="range"] { accent-color: #007bff; }

/* --- Sumário da Mistura --- */
.mixer-summary {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed var(--border-color);
  text-align: center;
}

.mixer-summary h3 { font-size: 24px; margin-bottom: 10px; }
.invalid { color: #dc3545; font-weight: bold; }
.warning { color: #dc3545; margin-bottom: 15px; }

/* Botão de Aplicar */
.apply-button {
  width: 100%;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: var(--icon-active);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px; /* Espaçamento */
}
.apply-button:hover {
  background-color: #0056b3;
}
.apply-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Responsividade: Coloca os cartões um em cima do outro */
@media (max-width: 992px) {
  .adjust-layout {
    grid-template-columns: 1fr;
  }
}

/* Remove as setas da caixa de número */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
</style>