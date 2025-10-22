// src/services/api.ts

// Este é o endereço do nosso servidor Python
const BASE_URL = 'http://localhost:5000/api';

/**
 * Busca o estado atual da impressora (temperaturas, status)
 */
export async function getStatus() {
  const response = await fetch(`${BASE_URL}/status`);
  if (!response.ok) {
    throw new Error('Falha ao buscar status do backend');
  }
  return response.json();
}

/**
 * Envia as percentagens de mistura para o backend
 */
export async function applyMix(mix: { ext1: number, ext2: number, ext3: number }) {
  const response = await fetch(`${BASE_URL}/mix`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Converte o objeto JavaScript em uma string JSON
    body: JSON.stringify(mix), 
  });

  if (!response.ok) {
    throw new Error('Falha ao aplicar mistura');
  }
  return response.json();
}

/**
 * Envia um ficheiro G-code para o backend
 */
export async function uploadFile(file: File) {
  // Usamos FormData para enviar ficheiros
  const formData = new FormData();
  formData.append('file', file, file.name);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    // Não definimos 'Content-Type', o navegador fá-lo-á
    // automaticamente quando usamos FormData
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Falha ao carregar ficheiro');
  }
  return response.json();
}   

export async function setLight(state: boolean) {
  const response = await fetch(`${BASE_URL}/light`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ state: state }), 
  });
  
  if (!response.ok) {
    throw new Error('Falha ao definir estado da luz');
  }
  return response.json();
}