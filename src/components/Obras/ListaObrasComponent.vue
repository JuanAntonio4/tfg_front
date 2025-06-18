<template>

    <ObrasAsCardView :obras="obras"/>
  
</template>
  

<script setup>
import ObrasAsCardView from '@/views/Obras/ObrasAsCardView.vue';
import {obras , setupListaObras} from '@/scripts/Obras/ListaObrasScript';

setupListaObras();
  
</script>

