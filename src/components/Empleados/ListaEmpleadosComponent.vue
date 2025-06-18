<template>

    <EmpleadosAsCardView :empleados="empleados"/>

</template>

<script setup>
import EmpleadosAsCardView from '@/views/Empleados/EmpleadosAsCardView.vue';
import { empleados, setupListaEmpleados } from '@/scripts/Empleados/ListaEmpleadosScript';

setupListaEmpleados();

</script>
