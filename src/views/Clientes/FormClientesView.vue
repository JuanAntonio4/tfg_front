<template>
  <v-container fluid class="d-flex justify-center align-center" style="min-height: 100vh;">
    <v-card elevation="10" max-width="800" class="pa-8 rounded-xl" style="width: 90%;">

    <v-btn icon="mdi-arrow-left" size="small" class="mb-4" :to="{ name: 'lista-de-clientes' }"></v-btn>
  
    <h3 class="text-h5 text-center font-weight-medium mb-6">
      {{ id ? `Edita el cliente: ${cliente.nombre} `  : 'Da de alta un cliente/empresa'}}
    </h3>
  
    <v-form ref="form" @submit.prevent="validaYEnvia" >
      
        <v-text-field v-model="cliente.nombre"  label="Introduce el nombre del cliente/empresa"
          required clearable variant="outlined" class="mb-4" ></v-text-field>
  
        <v-text-field v-model="cliente.direccion" 
          label="Introduce la dirección del cliente/empresa" required clearable variant="outlined" class="mb-4"
          ></v-text-field>
  
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn class="mt-2" type="submit" color="primary">{{ id ? 'Guardar cambios' : 'Enviar' }}</v-btn>
          </v-col>
        </v-row>
      
    </v-form>
  </v-card>
  </v-container>
</template>




<script setup>
defineProps({
  cliente: Object,
  id:[String, Number],
  validaYEnvia: Function,
});

</script>