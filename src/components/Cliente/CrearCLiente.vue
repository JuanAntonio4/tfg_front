<template>
    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-avisos'}"></v-btn>
     <h3 style="text-align: center; margin: 10px;">Da de alta un cliente/empresa</h3>
     
        <v-form v-model="valid" @submit.prevent="enviarFormulario" style="margin-bottom: 50px;">
          <v-container>
            <v-text-field 
              v-model="cliente.nombre"
              :rules="reglaNoVacio"
              label="Introduce el nombre del cliente/empresa"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-text-field>

            <v-text-field 
              v-model="cliente.direccion"
              :rules="reglaNoVacio"
              label="Introduce la dirección del cliente/empresa"
              required
              clearable
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn class="mt-2" type="submit">Enviar</v-btn>
              </v-col>
           </v-row>  
           
           <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡Cliente Creado!</v-card-title>
                <v-card-text>El cliente/empresa se ha dado de alta correctamente</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="cerrarDialogo">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
  
            
          </v-container>
        </v-form>
 
</template>

<script setup>

import { ref} from "vue";
  import { useRouter } from "vue-router";
  
  // Datos reactivos
  const cliente = ref({
    nombre: "",
    direccion: "",
  });
  

  const clientes= ref ([]);
  const router = useRouter();
  const dialog = ref(false)

  const enviarFormulario = async () => {
    try {
        const clienteSimple  ={...cliente.value}
        const respuesta = await fetch('/api/clientes', {
            method: 'POST',
            body: JSON.stringify(clienteSimple),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!respuesta.ok) {
            throw new Error("Error al crear el aviso");
        }

        dialog.value = true;
    } catch (error) {
          console.error("Error:", error);
    }

  };

  const cerrarDialogo = () =>{
    dialog.value = false;
    router.push('/lista-de-clientes')
  }


  const reglaNoVacio = [
  value => {
    if (!value || value.trim() === "") {
      return  "Este campo no puede estar vacío.";
    }
    return true;
  }
];

</script>

<style scoped>
</style>