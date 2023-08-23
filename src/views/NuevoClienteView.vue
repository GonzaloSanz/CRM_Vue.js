<script setup>
import { FormKit } from "@formkit/vue";
import { useRouter } from "vue-router";
import clienteAxios from "../../config/axios";
import RouterLink from "../components/UI/RouterLink.vue";
import Heading from "../components/UI/Heading.vue";
import { alertaExito } from "../assets/js/funciones";

const router = useRouter();

defineProps({
  titulo: {
    type: String,
    required: true,
  },
});

// Envío del Formulario
const handleSubmit = (data) => {
  // Asignar estado
  data.estado = 1;

  // Agregar cliente
  clienteAxios
    .post('/clientes', data)
    .then((respuesta) => {

      alertaExito('¡Cliente agregado con éxito!');
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
        submit-label="Agregar Cliente"
        incomplete-message=" "
        @submit="handleSubmit"
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
