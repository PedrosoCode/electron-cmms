<template>
  <main class="p-4">
    <h1>💾 Pedidos (SQLite local)</h1>

    <form @submit.prevent="addPedido" class="mt-4">
      <input v-model="novo.cliente" placeholder="Cliente" required />
      <input v-model="novo.data" type="date" required />
      <button type="submit">Adicionar</button>
    </form>

    <ul class="mt-4">
      <li v-for="p in pedidos" :key="p.id">
        {{ p.id }} - {{ p.cliente }} - {{ p.data }}
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const pedidos = ref([]);
const novo = ref({ cliente: '', data: '' });

async function carregar() {
  pedidos.value = await window.api.getPedidos();
}

async function addPedido() {
  if (!novo.value.cliente || !novo.value.data) return;
  await window.api.insertPedido({ ...novo.value });
  novo.value = { cliente: '', data: '' };
  carregar();
}

onMounted(carregar);
</script>

<style>
body {
  font-family: sans-serif;
}
input, button {
  margin-right: 8px;
}
</style>
