<template>

    <FormClientesView :cliente="cliente" :id="id" :validaYEnvia="validaYEnvia"/>

</template>


<script setup>
import { useRoute } from "vue-router";
import FormClientesView from '@/views/Clientes/FormClientesView.vue';
import {cliente, id , setupFormCliente , validaYEnvia} from '@/scripts/Clientes/FormClienteScript.js';

const route = useRoute();
setupFormCliente(route);


</script>