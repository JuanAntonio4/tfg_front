<template>

    <FormTrabajoRealizadoView :trabajo_realizado_aviso="trabajo_realizado_aviso" :trabajo_realizado_obra="trabajo_realizado_obra"
    :materiales="materiales" :id="id" :tipo="tipo" :validaYEnvia="validaYEnvia"/>

</template>

<script setup>
import { useRoute } from 'vue-router';
import FormTrabajoRealizadoView from '@/views/TrabajoRealizado/FormTrabajoRealizadoView.vue';
import { trabajo_realizado_obra, trabajo_realizado_aviso, validaYEnvia, materiales, id, setupFormTrabajoRealizado, tipo } from '@/scripts/TrabajoRealizado/FormTrabajoRealizadoScript'

const route = useRoute();
setupFormTrabajoRealizado(route);

</script>