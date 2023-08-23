<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  cliente: {
    type: Object,
    required: true,
  },
});

defineEmits(['actualizar-estado', 'eliminar-cliente']);

const nombreCliente = computed(() => {
  return props.cliente.nombre + " " + props.cliente.apellidos;
});

const estadoCliente = computed(() => {
  return props.cliente.estado ? "Activo" : "Inactivo";
});

</script>

<template>
  <tr>
    <td class="whitespace-nowrap px-3 py-4 text-sm sm:pl-0">
      <p class="font-medium text-gray-900">{{ nombreCliente }}</p>
      <p class="text-gray-500">{{ cliente.email }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <p class="text-gray-900 font-bold">{{ cliente.empresa }}</p>
      <p class="text-gray-600">{{ cliente.puesto }}</p>
    </td>
    <td class="whitespace-nowrap px-3 py-4 text-sm">
      <button
        type="button"
        class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
        :class="[
          cliente.estado
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800',
        ]"
         @click="$emit('actualizar-estado', { id: cliente.id, estado: cliente.estado})"
      >
        {{ estadoCliente }}
      </button>
    </td>

    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <RouterLink
        :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
        class="font-semibold text-indigo-600 hover:text-indigo-700 mr-5"
        >Editar</RouterLink
      >

      <button
       @click="$emit('eliminar-cliente', cliente.id)"
        class="font-semibold text-red-600 hover:text-red-700"
      >
        Eliminar
      </button>
    </td>
  </tr>
</template>
