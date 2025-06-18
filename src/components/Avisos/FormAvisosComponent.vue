<template>

  <FormAvisosView :aviso="aviso" :empleados="empleados" :clientes="clientes" :id="id" :validaYEnvia="validaYEnvia"/>

</template>


<script setup>
import { useRoute } from "vue-router";
import FormAvisosView from '@/views/Avisos/FormAvisosView.vue';
import { aviso, empleados, clientes, id, validaYEnvia, setupFormAviso } from '@/scripts/Avisos/FormAvisosScript.js';

const route = useRoute();  
setupFormAviso(route);  

</script>

