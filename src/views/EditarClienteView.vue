<script setup>
import { onMounted, reactive } from "vue";
import { FormKit } from "@formkit/vue";
import { useRoute, useRouter } from "vue-router";
import clienteAxios from "../../config/axios";
import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";
import { alertaExito } from "../assets/js/funciones";

const route = useRoute();
const router = useRouter();

// Obtener id del cliente a editar
const { id } = route.params;

const formData = reactive({
  nombre: "",
  apellidos: "",
  email: "",
  telefono: "",
  empresa: "",
  puesto: "",
});

onMounted(() => {
  obtenerCliente();
});

const obtenerCliente = async () => {
  await clienteAxios("/clientes/" + id)
    .then((respuesta) => {
      const { data } = respuesta;

      // Asignar datos del cliente al formulario
      Object.assign(formData, data);
    })
    .catch((error) => console.log(error));
};

defineProps({
  titulo: {
    type: String,
    required: true,
  },
});

// Envío del Formulario
const handleSubmit = async (datos) => {
  await clienteAxios
    .patch("/clientes/" + id, datos)
    .then((respuesta) => {
      alertaExito('¡Cliente editado con éxito!');
      router.push({ name: "listado-clientes" });
    })
    .catch((error) => console.log(error));
};
</script>

<template>
  <div>
    <div class="flex justify-end mb-4 md:mb-0">
      <RouterLink to="listado-clientes">Inicio</RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <div class="mx-auto my-10 bg-white rounded-md shadow p-5 md:w-2/3">
      <FormKit
        type="form"
        submit-label="Guardar Cambios"
        incomplete-message=" "
        @submit="handleSubmit"
        :value="formData"
      >
        <FormKit
          type="text"
          label="Nombre"
          name="nombre"
          placeholder="Nombre del Cliente"
          validation="required"
          :validation-messages="{
            required: 'El nombre es obligatorio',
          }"
          v-model="formData.nombre"
        />

        <FormKit
          type="text"
          label="Apellidos"
          name="apellidos"
          placeholder="Apellidos del Cliente"
          validation="required"
          :validation-messages="{
            required: 'Los apellidos son obligatorios',
          }"
          v-model="formData.apellidos"
        />

        <FormKit
          type="email"
          name="email"
          label="Correo Electrónico"
          placeholder="Correo electrónico del Cliente"
          validation="required|email"
          :validation-messages="{
            required: 'El correo electrónico es obligatorio',
            email: 'El correo electrónico no es válido',
          }"
          v-model="formData.email"
        />

        <FormKit
          type="text"
          name="telefono"
          label="Teléfono Móvil"
          placeholder="Teléfono Móvil del Cliente"
          validation="required|*matches:/^[67]\d{8}$/"
          :validation-messages="{
            required: 'El teléfono móvil es obligatorio',
            matches: 'El teléfono móvil no es válido',
          }"
          v-model="formData.telefono"
        />

        <FormKit
          type="text"
          label="Empresa"
          name="empresa"
          placeholder="Empresa del Cliente"
          validation="required"
          :validation-messages="{
            required: 'La empresa es obligatoria',
          }"
          v-model="formData.empresa"
        />

        <FormKit
          type="text"
          label="Puesto"
          name="puesto"
          placeholder="Puesto del Cliente"
          validation="required"
          :validation-messages="{
            required: 'El puesto es obligatorio',
          }"
          v-model="formData.puesto"
        />
      </FormKit>
    </div>
  </div>
</template>

<style>
.formkit-wrapper {
  max-width: 100%;
  margin-bottom: 5px;
}
</style>
