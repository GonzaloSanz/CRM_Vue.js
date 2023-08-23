<script setup>
import { onMounted, ref, computed } from "vue";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";
import Cliente from "../components/Cliente.vue";
import { alertaExito } from "../assets/js/funciones";

const clientes = ref([]);

/* 
  Creación de una REST API con JSON Server:

  Paso 1 -> Instalar con Powershell JSON Server con el comando npm -g json-server
  Paso 2 -> Levantar el archivo db.json en el puerto 4000 con el comando json-server --watch db.json --port 4000
*/

onMounted(() => {
  consultarAPI();
});

defineProps({
  titulo: {
    type: String,
    required: true,
  },
});

const consultarAPI = async () => {
  // Obtener clientes
  await clienteAxios("/clientes")
    .then((respuesta) => {
      clientes.value = respuesta.data;
    })
    .catch((error) => console.log(error));
};

const existenClientes = computed(() => {
  return clientes.value.length > 0;
});

const actualizarEstado = async ({ id, estado }) => {
  await clienteAxios
    .patch("/clientes/" + id, { estado: !estado })
    .then((respuesta) => {
      // Actualizar listado
      const indice = clientes.value.findIndex((cliente) => cliente.id === id);
      clientes.value[indice].estado = !estado;
    })
    .catch((error) => console.log(error));
};

const eliminarCliente = (id) => {
  Swal.fire({
    title: "¿Deseas eliminar este cliente?",
    text: "¡No podrás revertir los cambios!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4338ca",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Volver",
  }).then(async (result) => {
    // En caso afirmativo
    if (result.isConfirmed) {
      await clienteAxios
        .delete("/clientes/" + id, { id })
        .then((respuesta) => {
          alertaExito("¡Cliente eliminado con éxito!");

          // Actualizar listado de clientes
          const clientesActualizados = clientes.value.filter(clienteState => clienteState.id !== id);
          clientes.value = clientesActualizados;
        })
        .catch((error) => console.log(error));
    }
  });
};
</script>

<template>
  <div>
    <div class="flex justify-end mb-4 md:mb-0">
      <RouterLink to="agregar-cliente"> Agregar Cliente </RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <!-- Tabla de Clientes -->
    <div
      v-if="existenClientes"
      class="flow-root mx-auto mt-10 p-5 bg-white shadow"
    >
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="px-3 py-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Nombre Completo
                </th>
                <th
                  scope="col"
                  class="px-3 py-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Empresa
                </th>
                <th
                  scope="col"
                  class="px-3 py-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  class="px-3 py-2 text-left text-sm font-extrabold text-gray-600"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <Cliente
                v-for="cliente in clientes"
                :key="cliente.id"
                :cliente="cliente"
                @actualizar-estado="actualizarEstado"
                @eliminar-cliente="eliminarCliente"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <p v-else class="text-center mt-10 text-2xl">
      No se han encontrado clientes
    </p>
  </div>
</template>
