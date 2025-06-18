<template>
  <v-container fluid class="d-flex justify-center align-center" style="min-height: 100vh; background: linear-gradient(90deg, #ffffff, #aed6f1);">
    <v-card elevation="10" max-width="600" class="pa-8 rounded-xl" style="width: 90%;">
      <v-btn icon="mdi-arrow-left" size="small" class="mb-4" :to="id ? { name: 'lista-de-empleados' } : { name: 'login' }"></v-btn>

      <h3 class="text-h5 text-center font-weight-medium mb-6">
        {{ id ? `Edita el empleado: ${empleado.nombre}` : 'Da de alta un empleado' }}
      </h3>

      <v-form ref="form" @submit.prevent="validaYEnvia">
        <v-text-field
          v-model="empleado.nombre"
          label="Nombre completo del empleado"
          required clearable variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-model="empleado.usuario"
          label="Nombre de usuario"
          placeholder="usuario1"
          required clearable variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-if="!id"
          v-model="empleado.clave"
          label="Contraseña"
          type="password"
          required clearable variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-model="empleado.correo"
          label="Correo electrónico"
          required clearable variant="outlined"
          class="mb-4"
        />

        <v-text-field
          v-model="empleado.telefono"
          label="Teléfono de contacto"
          required clearable maxlength="9"
          variant="outlined"
          class="mb-4"
        />

        <v-select
          label="Rol del empleado"
          :items="['JEFE', 'TRABAJADOR']"
          v-model="empleado.rol"
          required clearable variant="outlined"
          class="mb-6"
        />

        <v-btn type="submit" color="primary" block large>
          {{ id ? 'Guardar cambios' : 'Enviar' }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
defineProps({
  empleado: Object,
  id: [String, Number],
  validaYEnvia: Function,
});
</script>

