<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-img :src="logo" max-width="150"
      class="mr-2"/>
    <v-btn prepend-icon="mdi-home" :to="{ name: 'menu-principal' }" class="mr-2">Inicio</v-btn> 

    <v-app-bar-title></v-app-bar-title>

    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-avatar size="32" class="mr-2">
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          <span>{{ autenticacionStore.usuario?.nombre }}</span>
          <v-chip color="green" variant="outlined" class="ml-2">
            {{ autenticacionStore.usuario?.rol }}
          </v-chip>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="cerrarSesion">
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" expand-on-hover>
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="(item, i) in listaMenuLateral"
        :key="i"
        :value="item"
        color="primary"
        rounded="xl"
        :to="{ name: item.ruta }"
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

<script setup>
import { useAutenticacionStore } from "@/stores/autenticacion";
const autenticacionStore = useAutenticacionStore();
import { drawer, listaMenuLateral, items, cerrarSesion } from "@/scripts/Cabecera-Footer/CabeceraScript";
import logo from '@/assets/LOGO-EDISONING.jpg';
</script>
