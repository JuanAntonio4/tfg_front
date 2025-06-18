<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import CabeceraComponent from "@/components/Cabecera-Footer/CabeceraComponent.vue";
import MensajesComponent from "@/components/Mensajes/MensajesComponent.vue";

const route = useRoute();

const isLoginPage = computed(() => route.path === "/" || route.path === "/formulario-empleado");
</script>

<template>
  <v-app style="display: flex; flex-direction: column; height: 100vh;">
    <template v-if="isLoginPage">
      <div><MensajesComponent /></div>
      <router-view />
    </template>
    <template v-else>
      <CabeceraComponent />
      <v-main style="flex: 1; background: linear-gradient(90deg, #ffffff, #85c1e9);">
        <MensajesComponent />
        <router-view />
      </v-main>
      </template>
  </v-app>
</template>