<template>
  
    <v-dialog  transition="dialog-bottom-transition" v-model="dialog" max-width="400px" >
      <v-card>
        <v-card-text v-for="(success, index) in messageStore.success" :key="index" style="background-color: rgb(209, 251, 188);">
          {{ success }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { useMessagesStore } from "@/stores/messages";
  import { computed } from "vue";
  
  const messageStore = useMessagesStore();
  const dialog = computed(() => (messageStore.success && messageStore.success.length > 0));
  
  </script>
  