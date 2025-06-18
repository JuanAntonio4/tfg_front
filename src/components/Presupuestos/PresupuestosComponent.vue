<template>

<PresupuestosView :trabajo_realizado_aviso="trabajo_realizado_aviso" />


</template>

<script setup>
import PresupuestosView from '@/views/Presupuestos/PresupuestosView.vue';
import { trabajo_realizado_aviso, setupTrabajoRealizadoAviso } from '@/scripts/Presupuestos/PresupuestosScript';
import { useRoute } from 'vue-router';

const route = useRoute();
setupTrabajoRealizadoAviso(route);


</script>