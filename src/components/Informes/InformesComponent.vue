<template>

    <InformesView :trabajo_realizado_aviso="trabajo_realizado_aviso" :trabajo_realizado_obra="trabajo_realizado_obra" :tipo="tipo"/>

</template>

<script setup>
import InformesView from '@/views/Informes/InformesView.vue';
import { useRoute } from 'vue-router';
import { trabajo_realizado_aviso,trabajo_realizado_obra, setupTrabajoRealizadoInformes, tipo } from '@/scripts/Informes/InformesScript'

const route = useRoute()
setupTrabajoRealizadoInformes(route)
</script>