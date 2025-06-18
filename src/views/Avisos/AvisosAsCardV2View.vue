<template>
  <v-container>
    <v-btn icon="mdi-arrow-left" size="small" class="ma-4" :to=" '/menu-principal'"></v-btn>

    <v-btn v-if="autenticacionStore.usuario.rol === 'JEFE'" append-icon="mdi-plus" variant="outlined"style="background-color: white; margin-left: 20px; margin-top: 20px; margin-bottom: 20px;" :to="{ name: 'formulario-aviso' }">Crea un aviso</v-btn>

    <h3 class="text-center text-h5 mt-6 mb-3 font-weight-bold">AVISOS</h3>
    <v-divider class="mb-4"></v-divider>

    <v-text-field
      v-model="search"
      label="Buscar avisos"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-magnify"
      class="mb-6"
      style=""
    ></v-text-field>

    <v-row justify="center" class="align-stretch">
      <v-col cols="12" md="4" v-for="aviso in avisosFiltrados" :key="aviso.id">
        <v-card elevation="3" class="card pa-4 rounded-xl card-equal-height" style="display: flex; flex-direction: column;transition: 0.3s;">
          <v-card-title class="text-h6 font-weight-bold" style="white-space: normal; word-break: break-word;">{{ aviso.nombre }}</v-card-title>
          <v-card-subtitle class="text-caption" style="white-space: normal; word-break: break-word;">Cliente: {{ aviso.cliente.nombre }}</v-card-subtitle>
          <v-card-subtitle class="text-caption" style="white-space: normal; word-break: break-word;">Fecha: {{ aviso.fecha }}</v-card-subtitle>

          <v-card-text class="text-body-2 mt-2" >
            <v-icon icon="mdi-information-outline" size="18" class="mr-1" color="primary" />
            {{ aviso.descripcion }}

          </v-card-text>

          <v-divider class="my-2"></v-divider>

          <v-card-text class="d-flex justify-center align-center">
            <v-chip v-if="aviso.empleado === null" color="red" variant="flat">SIN ASIGNAR</v-chip>
            <v-chip v-else variant="outlined" color="primary">
              <v-icon icon="mdi-account-circle-outline" start></v-icon>{{ aviso.empleado.nombre }}
            </v-chip>
          </v-card-text>

          <v-divider class="my-2"></v-divider>

          <v-card-text class="d-flex justify-center align-center">
            <v-chip :style="{ color: aviso.prioridad === 'URGENTE' ? 'red' : '' }" class="mr-2">{{ aviso.prioridad }}</v-chip>
            <v-chip v-if="aviso.estado === 'EN_PROCESO'" color="primary" variant="flat">EN PROCESO</v-chip>
            <v-chip v-else color="green" variant="flat">FINALIZADO</v-chip>
          </v-card-text>

          <v-divider :thickness="2" class="border-opacity-25"></v-divider>

          <v-card-actions class="justify-center mt-auto" style="min-height: 50px; display: flex; align-items: center;" v-if="autenticacionStore.usuario && autenticacionStore.usuario.rol === 'JEFE'">
            <div class="d-flex flex-wrap justify-center">
              <v-btn icon="mdi-pencil" size="small" variant="tonal" color="primary" :to="`/formulario-aviso/${aviso.id}`" class="ma-1"></v-btn>
              <v-btn icon="mdi-delete" size="small" variant="tonal" color="red" @click="abrirDialogo(aviso)" class="ma-1"></v-btn>
              <v-btn v-if="aviso.estado === 'EN_PROCESO'" :disabled="aviso.empleado === null" icon="mdi-account-hard-hat" size="small" variant="tonal" color="teal" :to="`/introducir-trabajo/${aviso.id}/aviso`" class="ma-1"></v-btn>
              <v-btn v-if="!botonesInformesDeshabilitados[aviso.id]" prepend-icon="mdi-file-document" size="small" variant="tonal" color="indigo" :to="`/informes/${aviso.id}/aviso`" class="ma-3">Informes</v-btn>
              <v-btn v-if="aviso.estado === 'FINALIZADO'" prepend-icon="mdi-file-document" size="small" variant="tonal" color="indigo" :to="`/presupuesto-aviso/${aviso.id}`" class="ma-3">Presupuesto</v-btn>
            </div>
          </v-card-actions>
          <v-card-actions class="justify-center mt-auto" style="min-height: 50px; display: flex; align-items: center;" v-else>
            <div class="d-flex flex-wrap justify-center">
              <v-btn v-if="aviso.estado === 'EN_PROCESO'" :disabled="aviso.empleado === null" icon="mdi-account-hard-hat" size="small" variant="tonal" color="teal" :to="`/introducir-trabajo/${aviso.id}/aviso`" class="ma-1"></v-btn>
              
              
            </div>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Confirmación de Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este aviso?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
          <v-btn color="error" @click="eliminarAviso">Eliminar</v-btn>
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
  eliminarAviso,
  dialog,
  search,
  avisosFiltrados,
  botonesInformesDeshabilitados
} from '@/scripts/Avisos/ListaAvisosScript'

const autenticacionStore = useAutenticacionStore()


defineProps({
  avisos: Array
})
</script>
