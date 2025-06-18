<template>

  <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px; margin-top: 20px;"
    :to="{ name: 'menu-principal' }"> </v-btn>

  <v-btn v-if="autenticacionStore.usuario.rol === 'JEFE'" prepend-icon="mdi-plus" size="small"
    style="margin-left: 20px; margin-top: 20px;" :to="{ name: 'formulario-aviso' }">Crea un aviso</v-btn>

  <h3 style="text-align: center; margin-bottom: 15px;">AVISOS</h3>

  <v-divider></v-divider>


  <v-container>

    <v-text-field v-model="search" label="Buscar avisos" variant="outlined" density="compact"
      prepend-inner-icon="mdi-magnify" style="margin-bottom: 20px;"></v-text-field>
      
    <v-row>
      <v-card v-for="aviso in avisosFiltrados" :key="aviso" elevation="10" style="margin: 20px;" variant="outlined"
        width="350px" class="card">

        <v-card-title>{{ aviso.nombre }}</v-card-title>
        <v-card-subtitle>Cliente: {{ aviso.cliente.nombre }} / Fecha: {{ aviso.fecha }} </v-card-subtitle>
        <v-card-text> {{ aviso.descripcion }}</v-card-text>

        <v-card-text> Empleado asignado:
          <v-chip v-if="aviso.empleado === null" color="red" variant="flat">
            SIN ASIGNAR
          </v-chip>
          <v-chip v-else variant="outlined" color="primary"> <v-icon icon="mdi-account-circle-outline" start></v-icon>{{
            aviso.empleado.nombre }} </v-chip>
        </v-card-text>

        <v-card-text> Prioridad:
          <v-chip :style="{ color: aviso.prioridad === 'URGENTE' ? 'red' : '' }" style="margin: 15px;">
            {{ aviso.prioridad }}
          </v-chip>
        </v-card-text>

        <v-card-text> Estado:
          <v-chip v-if="aviso.estado === 'EN_PROCESO'" color="primary" variant="flat"> EN PROCESO</v-chip>
          <v-chip v-else color="green" variant="flat"> FINALIZADO </v-chip>
        </v-card-text>



        <v-divider></v-divider>

        <v-card-actions class="d-flex flex-column" v-if="autenticacionStore.usuario == null"></v-card-actions>
        <v-card-actions class="d-flex flex-wrap justify-start" v-else-if="autenticacionStore.usuario.rol === 'JEFE'">

          <v-btn prepend-icon="mdi-pencil" variant="outlined" class="button" :to="`/formulario-aviso/${aviso.id}`">Editar</v-btn>

          <v-btn prepend-icon="mdi-delete" variant="outlined" class="button" @click="abrirDialogo(aviso)"> Eliminar</v-btn>

          <v-btn v-if="aviso.estado === 'EN_PROCESO'" :disabled="aviso.empleado === null" prepend-icon="mdi-account-hard-hat" variant="outlined" class="button" :to="`/introducir-trabajo/${aviso.id}/aviso`">Introducir trabajo realizado</v-btn>

          <v-btn  prepend-icon="mdi-file-document" variant="outlined" class="button" :to="`/informes/${aviso.id}/aviso`" :disabled="botonesInformesDeshabilitados[aviso.id]">Informes</v-btn>

          <v-btn v-if="aviso.estado === 'FINALIZADO'" prepend-icon="mdi-file-document" variant="outlined" class="button"  :to="`/presupuesto-aviso/${aviso.id}`">Presupuesto</v-btn>

        </v-card-actions>

        <v-card-actions v-else class="d-flex flex-column">

          <v-btn v-if="aviso.estado === 'EN_PROCESO'" prepend-icon="mdi-account-hard-hat" variant="outlined" :to="`/introducir-trabajo/${aviso.id}/aviso`">Introducir trabajo realizado</v-btn>

        </v-card-actions>

      </v-card>
    </v-row>

    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Confirmación de Eliminación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas eliminar este aviso?
        </v-card-text>
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
import { useAutenticacionStore } from '@/stores/autenticacion';
import { cerrarDialogo, abrirDialogo, eliminarAviso, dialog, search, avisosFiltrados, botonesInformesDeshabilitados } from '@/scripts/Avisos/ListaAvisosScript';

const autenticacionStore = useAutenticacionStore();

defineProps({
  avisos: Array,
});

</script>
