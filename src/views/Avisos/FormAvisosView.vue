<template>
  <v-container fluid class="d-flex justify-center align-center" style="min-height: 100vh;">
    <v-card elevation="10" max-width="800" class="pa-8 rounded-xl" style="width: 90%;">
      <v-btn icon="mdi-arrow-left" size="small" class="mb-4" :to="{ name: 'lista-de-avisos' }"></v-btn>

      <h3 class="text-h5 text-center font-weight-medium mb-6">
        {{ id ? `Edita el aviso : ${aviso.nombre}` : 'Crea un nuevo aviso' }}
      </h3>

      <v-form ref="form" @submit.prevent="validaYEnvia">
        <v-text-field v-model="aviso.nombre" label="Introduce el nombre del aviso" required clearable variant="outlined" class="mb-4"></v-text-field>

        <v-textarea v-model="aviso.descripcion" label="Introduce una descipción para el aviso" required clearable variant="outlined" class="mb-4"></v-textarea>

        <v-select v-model="aviso.id_empleado" label="Asigna un empleado" :items="empleados" item-title="nombre" item-value="id" required clearable variant="outlined" class="mb-4"></v-select>

        <v-select v-model="aviso.id_cliente" label="Selecciona un cliente" :items="clientes" item-title="nombre" item-value="id" required clearable variant="outlined" class="mb-4"></v-select>

        <v-text-field v-model="aviso.fecha" type="date" label="Selecciona una fecha" required clearable variant="outlined" class="mb-4" />

        <v-select label="Selecciona la prioridad" :items="['URGENTE', 'NORMAL']" v-model="aviso.prioridad" required clearable variant="outlined" class="mb-4"></v-select>

        <v-select label="Seleccione el estado" :items="['EN_PROCESO', 'FINALIZADO']" v-model="aviso.estado" required clearable variant="outlined" class="mb-6"></v-select>

        <v-btn type="submit" color="primary" block large>
          {{ id ? 'Guardar cambios' : 'Enviar' }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>



<script setup>
defineProps({
  aviso: Object,
  id: [String, Number],
  validaYEnvia: Function,
  empleados: Array,
  clientes: Array,
});
</script>

