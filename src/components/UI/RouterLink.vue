<script setup>
import { RouterLink } from "vue-router";

defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <RouterLink
      :to="{ name: to }"
      class="block md:inline-block rounded-md bg-blue-600 hover:bg-blue-700 transition-colors py-2 px-3 text-white uppercase font-bold text-sm shadow"
    >
      <slot></slot>
    </RouterLink>
  </div>
</template>
