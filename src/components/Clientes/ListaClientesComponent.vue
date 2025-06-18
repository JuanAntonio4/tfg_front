<template>

    <ClienteAsCardView :clientes="clientes" />

</template>


<script setup>
import ClienteAsCardView from '@/views/Clientes/ClientesAsCardView.vue';
import {clientes, setupListaClientes} from '@/scripts/Clientes/ListaClientesScript.js';

setupListaClientes();
</script>