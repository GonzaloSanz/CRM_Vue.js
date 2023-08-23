<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <header class="bg-slate-800 px-4">
    <div class="mx-auto max-w-6xl py-10">
      <h1 class="text-4xl font-extrabold text-white">
        Admimistrador de Clientes
      </h1>
    </div>
  </header>

  <main class="px-4 md:p-0 max-w-6xl mx-auto mt-10">
    <RouterView />
  </main>
</template>
