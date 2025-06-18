<template>
  <v-container>
    <v-btn icon="mdi-arrow-left" size="small" class="ma-4" :to="{ name: 'menu-principal' }"> </v-btn>

    <v-btn
      v-if="autenticacionStore.usuario.rol === 'JEFE'"
      append-icon="mdi-plus" variant="outlined"style="background-color: white; margin-left: 20px; margin-top: 20px; margin-bottom: 20px;"
      :to="{ name: 'formulario-obra' }"
    >
      Crea una obra
    </v-btn>

    <h3 class="text-center text-h5 mt-6 mb-3 font-weight-bold">OBRAS</h3>

    <v-divider class="mb-4"></v-divider>

    <v-text-field
      v-model="search"
      label="Buscar obras"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-magnify"
      class="mb-6"
    ></v-text-field>

    <v-row justify="center">
      <v-col cols="12" md="4" v-for="obra in obrasFiltradas" :key="obra.id">
        <v-card elevation="3" class="card pa-4 rounded-xl" style="transition: 0.3s;"

        >
          <v-card-title class="text-h6 font-weight-bold">{{ obra.nombre }}</v-card-title>
          <v-card-subtitle class="text-caption">Cliente: {{ obra.cliente.nombre }}</v-card-subtitle>
          <v-card-subtitle class="text-caption">Fecha: {{ obra.fecha_prevista_fin }}</v-card-subtitle>

          <v-card-text class="text-body-2 mt-2">
            <v-icon icon="mdi-map-marker" size="18" class="mr-1" color="primary" />
            {{ obra.cliente.direccion }}
          </v-card-text>

          <v-divider class="my-2"></v-divider>

          <v-card-actions class="d-flex flex-wrap justify-center" v-if="autenticacionStore.usuario && autenticacionStore.usuario.rol === 'JEFE'">
            
            <v-btn icon="mdi-pencil" size="small" variant="tonal" color="primary" :to="`/formulario-obra/${obra.id}`" />
            <v-btn icon="mdi-delete" size="small" variant="tonal" color="red" @click="abrirDialogo(obra)" />
            <v-btn icon="mdi-account-hard-hat" size="small" variant="tonal" color="teal" :to="`/introducir-trabajo/${obra.id}/obra`" />
            <v-btn v-if="!botonesInformesDeshabilitados[obra.id]" prepend-icon="mdi-file-document" size="small" variant="tonal" color="indigo" :to="`/informes/${obra.id}/obra`"> Informes</v-btn>

          </v-card-actions>
          <v-card-actions class="d-flex flex-wrap justify-center" v-else>
            
            <v-btn icon="mdi-account-hard-hat" size="small" variant="tonal" color="teal" :to="`/introducir-trabajo/${obra.id}/obra`" />

            
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Confirmación de Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar esta obra?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
          <v-btn color="error" @click="eliminarObra">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import '@/assets/style/listas.css'
import { ref } from 'vue'
import { useAutenticacionStore } from '@/stores/autenticacion'
import {
  cerrarDialogo,
  abrirDialogo,
  dialog,
  eliminarObra,
  search,
  obrasFiltradas,
  botonesInformesDeshabilitados
} from '@/scripts/Obras/ListaObrasScript'

const autenticacionStore = useAutenticacionStore()
const hover = ref(null)

defineProps({
  obras: Array
})
</script>

