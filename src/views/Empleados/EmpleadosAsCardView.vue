<template>
   <v-container>
    <v-btn icon="mdi-arrow-left" size="small" class="ma-4" :to="{ name: 'menu-principal' }"> </v-btn>

    <h3 class="text-center text-h5 mt-6 mb-3 font-weight-bold">EMPLEADOS</h3>
  
    <v-divider class="mb-4"></v-divider>

    <v-text-field
      v-model="search"
      label="Buscar empleados"
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-magnify"
      class="mb-6"
    ></v-text-field>
 
    
    <v-row justify="center">
      <v-col cols="12" md="4" v-for="empleado in empleadosFiltrados" :key="empleado.id">

      <v-card elevation="3" class="card pa-4 rounded-xl" style="transition: 0.3s;">

        <v-card-title class="text-h6 font-weight-bold">{{ empleado.nombre }}</v-card-title>
        <v-card-subtitle class="text-caption"> Nombre de usuario: {{ empleado.usuario }} </v-card-subtitle>

        <v-card-text lass="text-body-2 mt-2"> 
          <v-icon icon="mdi-gmail" size="18" class="mr-1" color="primary" />
          {{ empleado.correo }}

        </v-card-text>

        <v-card-text> 
          <v-icon icon="mdi-phone" size="18" class="mr-1" color="primary" />
           {{ empleado.telefono }}
        </v-card-text>

        <v-card-text>   
          <v-icon icon="mdi-account-star" size="18" class="mr-3" color="primary" />
            <v-chip v-if="empleado.rol === 'JEFE'" color="primary" variant="flat">{{ empleado.rol }}</v-chip>
            <v-chip v-else variant="outlined" color="primary" >  {{empleado.rol }} </v-chip>
        </v-card-text>
    
        <v-divider class="my-2"></v-divider>
     
        <v-card-actions class="d-flex flex-wrap justify-center" v-if="autenticacionStore.usuario == null" ></v-card-actions>
        <v-card-actions class="d-flex flex-wrap justify-center" v-else-if="autenticacionStore.usuario.rol === 'JEFE'">

          <v-btn icon="mdi-pencil" size="small" variant="tonal" color="primary" :to="`/formulario-empleado/${empleado.id}`"></v-btn> 
          <v-btn icon="mdi-delete" size="small" variant="tonal" color="red" @click="abrirDialogo(empleado)"> </v-btn> 
        </v-card-actions>
  
      </v-card>
    </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title class="text-h6">Confirmación de Eliminación</v-card-title>
      <v-card-text>
        ¿Estás seguro de que deseas eliminar este empleado?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="cerrarDialogo">Cancelar</v-btn>
        <v-btn color="error" @click="eliminarEmpleado">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  </v-container>
  
</template>
  
<script setup>
import '@/assets/style/listas.css'
import { useAutenticacionStore } from '@/stores/autenticacion';
import { dialog, abrirDialogo, cerrarDialogo, eliminarEmpleado, search,empleadosFiltrados } from '@/scripts/Empleados/ListaEmpleadosScript'

const autenticacionStore = useAutenticacionStore();

defineProps({
  empleados: Array,
});

</script>

  