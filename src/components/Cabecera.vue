<template>
<v-app-bar :elevation="4">

  <v-btn icon="mdi-home" style="margin-left: 20px;" :to="{name:'menu-principal'}" variant="text"></v-btn>
  <v-app-bar-title>Edisoning Gestión</v-app-bar-title>
  <v-btn @click="toggleTheme"><v-icon icon="mdi-lightbulb"></v-icon></v-btn>

</v-app-bar>



</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}


</script>


<style scoped>


</style>