<script setup>

import Cabecera from './components/Cabecera.vue';
import MenuLateral from './components/MenuLateral.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <v-app class="fill-height">

      <Cabecera></Cabecera>
      <MenuLateral></MenuLateral>>
      <v-main class="flex-grow-1">
        <router-view />
      </v-main>
      <!-- <Footer></Footer> --> 

   
  </v-app> 
 
   
</template>




