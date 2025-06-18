<template>

    <FormObrasView :obra="obra" :clientes="clientes" :id="id" :validaYEnvia="validaYEnvia"/>

</template>

<script setup>
import { useRoute } from "vue-router";
import FormObrasView from "@/views/Obras/FormObrasView.vue";
import {obra, clientes, id, setupFormObras, validaYEnvia} from "@/scripts/Obras/FormObrasScript";

const route = useRoute();
setupFormObras(route);
</script>