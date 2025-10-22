<template>
  <section class="page">
    
    <div class="main-header">
      <h3>Ficheiros G-Code</h3>
    </div>

    <div class="file-upload-container">
      
      <div 
        class="drop-zone"
        :class="{ dragging: isDragging }"
        @click="triggerFileInput"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <i class="fas fa-upload icon-large"></i>
        <p>Arraste e largue os seus ficheiros .gcode aqui</p>
        <p class="small-text">ou</p>
        <button class="select-button">Selecionar Ficheiros</button>
      </div>

      <input 
        type="file"
        ref="fileInput" 
        @change="handleFileSelect"
        multiple 
        accept=".gcode,.gco"
        style="display: none;"
      >

      <div class="file-list" v-if="selectedFiles.length > 0">
        <h4>Ficheiros a carregar:</h4>
        
        <div 
          class="file-item" 
          v-for="(file, index) in selectedFiles" 
          :key="file.name"
        >
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
          
          <button class="remove-button" @click="removeFile(index)">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <button 
          class="upload-button" 
          @click="uploadFiles" 
          :disabled="selectedFiles.length === 0 || isUploading"
        >
          <span v-if="isUploading">A carregar...</span>
          <span v-else>Carregar {{ selectedFiles.length }} Ficheiro(s)</span>
        </button>
      </div>
    </div>

    <div class="server-files">
      <h4>Ficheiros na Impressora</h4>
      <p class="placeholder-text">
        (Aqui ficará a lista de ficheiros já carregados no Pi)
      </p>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Importa a nossa API
import { uploadFile } from '../services/api';

// --- ESTADO REATIVO ---
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);
const isDragging = ref(false);
const isUploading = ref(false); // Estado de Uploading

// --- MÉTODOS DE EVENTOS ---

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    addFiles(target.files);
  }
}

function handleDragOver() {
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}

function handleDrop(event: DragEvent) {
  isDragging.value = false;
  if (event.dataTransfer?.files) {
    addFiles(event.dataTransfer.files);
  }
}


// --- MÉTODOS DE AÇÃO ---

function addFiles(files: FileList) {
  const newFiles = Array.from(files);
  const gcodeFiles = newFiles.filter(file => 
    file.name.endsWith('.gcode') || file.name.endsWith('.gco')
  );
  selectedFiles.value = [...selectedFiles.value, ...gcodeFiles];

  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

function removeFile(index: number) {
  selectedFiles.value.splice(index, 1);
}

// Função principal de upload (agora assíncrona)
async function uploadFiles() {
  if (selectedFiles.value.length === 0) return;

  isUploading.value = true;

  try {
    // Criamos uma lista de "promessas" de upload
    const uploadPromises = selectedFiles.value.map(file => uploadFile(file));
    
    // Promise.all espera que todos os uploads terminem
    await Promise.all(uploadPromises);

    alert('Ficheiros carregados com sucesso!');
    selectedFiles.value = []; // Limpa a lista

  } catch (error) {
    console.error(error);
    alert('Erro ao carregar um ou mais ficheiros.');
  } finally {
    isUploading.value = false;
  }
}


// --- FUNÇÕES AUXILIARES ---

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

</script>

<style scoped>
/* O cabeçalho padrão */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.file-upload-container {
  width: 100%;
  margin-bottom: 30px;
}

.drop-zone {
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.drop-zone:hover {
  background-color: var(--widget-bg);
  border-color: var(--icon-active);
}

/* Estilo aplicado quando se arrasta um ficheiro por cima */
.drop-zone.dragging {
  background-color: #e0eaff;
  border-color: var(--icon-active);
  border-style: solid;
}

.drop-zone .icon-large {
  font-size: 48px;
  color: var(--icon-active);
  margin-bottom: 15px;
}

.drop-zone p {
  margin: 5px 0;
  font-size: 16px;
}

.drop-zone .small-text {
  font-size: 14px;
  color: #6c757d;
}

.select-button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: var(--icon-active);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Lista de Ficheiros Selecionados */
.file-list {
  margin-top: 20px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--widget-bg);
  border-radius: 5px;
  margin-bottom: 8px;
}

.file-name {
  flex-grow: 1;
  font-weight: bold;
}

.file-size {
  margin-left: 15px;
  font-size: 14px;
  color: #6c757d;
}

.remove-button {
  margin-left: 15px;
  background: none;
  border: none;
  color: #dc3545; /* Vermelho */
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
}

.upload-button {
  margin-top: 15px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #28a745; /* Verde */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upload-button:hover {
  background-color: #218838;
}

.upload-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* Placeholder para ficheiros do servidor */
.server-files {
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
}

.placeholder-text {
  color: #6c757d;
  font-style: italic;
}
</style>