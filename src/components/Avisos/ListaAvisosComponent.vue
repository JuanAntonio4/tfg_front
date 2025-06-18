<template>

  <AvisosAsCardV2View :avisos="avisos" />

</template>


<script setup>
import { avisos, setupListaAvisos } from '@/scripts/Avisos/ListaAvisosScript.js';
//import AvisosAsCard from '@/views/Avisos/AvisosAsCardView.vue';
import AvisosAsCardV2View from '@/views/Avisos/AvisosAsCardV2View.vue';

setupListaAvisos();

</script>



