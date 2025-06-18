<template>

    <FormEmpleadosView :empleado="empleado" :id="id" :validaYEnvia="validaYEnvia" />

</template>

<script setup>
import FormEmpleadosView from '@/views/Empleados/FormEmpleadosView.vue';
import { empleado, id,  validaYEnvia , setupFormEmpleado} from '@/scripts/Empleados/FormEmpleadosScript';
import { useRoute } from 'vue-router';

const route = useRoute();
setupFormEmpleado(route);

</script>