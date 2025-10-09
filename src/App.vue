

<!-- <template>
  <main class="p-4">
    <h1 class="border">💾 Pedidos (SQLite + TS)</h1>

    <form @submit.prevent="addPedido">
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
</template> -->

<template>
  <router-view />
</template>


<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Pedido } from './db';
import './Global.css'

const pedidos = ref<Pedido[]>([]);
const novo = ref<Pedido>({ cliente: '', data: '' });

async function carregar() {
  pedidos.value = await window.api.getPedidos();
}

async function addPedido() {
  if (!novo.value.cliente || !novo.value.data) return;

  const pedidoPlano = {
    cliente: novo.value.cliente,
    data: novo.value.data
  };

  await window.api.insertPedido(pedidoPlano);
  novo.value = { cliente: '', data: '' };

  carregar();
}

onMounted(carregar);
</script> -->
