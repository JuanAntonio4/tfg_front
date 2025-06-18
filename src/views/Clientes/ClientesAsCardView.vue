<template>
<v-container>
    <v-btn icon="mdi-arrow-left" size="small" class="ma-4" :to="{ name: 'menu-principal' }"> </v-btn>
    <v-btn  v-if="autenticacionStore.usuario.rol === 'JEFE'" append-icon="mdi-plus" variant="outlined"style="background-color: white; margin-left: 20px; margin-top: 20px; margin-bottom: 20px;" :to="{ name: 'formulario-cliente' }">Dar de alta un cliente</v-btn> 
  
    <h3 class="text-center text-h5 mt-6 mb-3 font-weight-bold">CLIENTES</h3>
  
    <v-divider class="mb-4"></v-divider>

    <v-text-field
      v-model="search"
      label="Buscar clientes"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-magnify"
      class="mb-6"
      style=""
    ></v-text-field>
  
    
    <v-row justify="center">
      <v-col cols="12" md="4" v-for="cliente in clientesFiltrados" :key="cliente.id">
      <v-card elevation="3" class="card pa-4 rounded-xl" style="transition: 0.3s;">

        <v-card-title class="text-h6 font-weight-bold">{{ cliente.nombre }}</v-card-title>
        <v-card-text class="text-caption"> 
          <v-icon icon="mdi-map-marker" size="18" class="mr-1" color="primary" />
          {{ cliente.direccion }}
        </v-card-text>
  
        <v-divider class="my-2"></v-divider>
     
        <v-card-actions class="d-flex flex-wrap justify-center" v-if="autenticacionStore.usuario == null" ></v-card-actions>
        <v-card-actions class="d-flex flex-wrap justify-center" v-else-if="autenticacionStore.usuario.rol === 'JEFE'">

          <v-btn icon="mdi-pencil" size="small" variant="tonal" color="primary" :to="`/formulario-cliente/${cliente.id}`" ></v-btn> 
          <v-btn icon="mdi-delete" size="small" variant="tonal" color="red" @click="abrirDialogo(cliente)" > </v-btn>
      
        </v-card-actions>
   
  
      </v-card>
    </v-col>
    </v-row>
  
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">Confirmación de Eliminación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que deseas eliminar este cliente?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
          <v-btn color="error" @click="eliminarCliente">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </v-container>
  
  </template>
    
    
    
  <script setup>
  import '@/assets/style/listas.css'
  import { useAutenticacionStore } from '@/stores/autenticacion';
  import {dialog,abrirDialogo,cerrarDialogo,eliminarCliente, search, clientesFiltrados} from '@/scripts/Clientes/ListaClientesScript.js';
  const autenticacionStore = useAutenticacionStore();
  
  defineProps({
    clientes: Array,
  });
  
  </script>
  