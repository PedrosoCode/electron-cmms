<script setup lang="ts">
</script>

<template>
  <main class="bg-slate-100 min-h-screen">

    <!-- Hero Section -->
    <section class="bg-slate-800 text-white py-20 px-6 md:px-16 flex flex-col justify-center">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Computerized Maintenance Management System
        </h1>
        <p class="text-lg md:text-xl text-slate-300">
          Preditiva, Corretiva, Preventiva, e tudo mais que você precisar.
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 px-4 md:px-16">
      <div class="max-w-5xl mx-auto bg-slate-200 rounded-3xl shadow-md p-8 border border-gray-300">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Funcionalidades</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li class="bg-white p-4 rounded-xl shadow-sm">📋 Ordens de Serviço</li>
          <li class="bg-white p-4 rounded-xl shadow-sm">🔍 Controle de Ativos</li>
          <li class="bg-white p-4 rounded-xl shadow-sm">📈 Relatórios de Manutenção</li>
          <li class="bg-white p-4 rounded-xl shadow-sm">⚙️ Tipos de Manutenção</li>
        </ul>
      </div>
    </section>
    <button 
          @click="$router.push('about')" 
          class="px-4 py-2 bg-indigo-600 text-white font-medium text-lg rounded-lg border border-indigo-700 transition-all hover:bg-indigo-700 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Iniciar
        </button>
  </main>
</template>