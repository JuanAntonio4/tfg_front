<template>
     <v-alert v-if="messageStore.errores" v-for="error in messageStore.errores" color="error" icon="$error" :text="error"
     closable @click="messageStore.clearMessagesError" style="margin: 10px;"></v-alert>
     
     <v-alert v-if="messageStore.success" v-for="success in messageStore.success" color="success" icon="$success" :text="success"
     closable @click="messageStore.clearMessageSuccess" style="margin: 10px;"></v-alert>
    
  </template>
  
  <script setup>
    import { useMessagesStore } from "@/stores/messages";

    const messageStore = useMessagesStore();
    

  </script>