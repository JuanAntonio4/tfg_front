<template>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
      <v-list>
          <v-list-item
            prepend-icon='mdi-account-box'
            :subtitle=" 'Usuario desconocido'"
            :title=" 'Usuario desconocido'"
          ></v-list-item>
      </v-list>

        <v-divider></v-divider>
      <v-list>
    
    

      <v-list-item
        v-for="(item, i) in listaMenuLateral"
        :key="i"
        :value="item"
        color="primary"
        rounded="xl"
        :to="{name :item.ruta}"
        style="text-decoration: none;"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.nombre"></v-list-item-title>
      </v-list-item>
    </v-list>
  
      </v-navigation-drawer>


</template>

<script setup >

import {ref} from "vue";
import { useAuth } from "../composables/useAuth"; // Importa la referencia compartida

const { user } = useAuth(); // Obtén la referencia del usuario


const listaMenuLateral= ref([
      {
        nombre: 'Avisos',
        icon: 'mdi-alert',
        ruta: 'lista-de-avisos'
      },
      {
        nombre: 'Obras',
        icon: 'mdi-wrench',
        ruta: 'lista-de-obras'
      },
      {
        nombre: 'Empleados',
        icon: 'mdi-account-multiple',
        ruta: 'lista-de-empleados'
      },
      {
        nombre: 'Clientes',
        icon: 'mdi-account-tie',
        ruta: 'lista-de-clientes'
      },

]);



</script>