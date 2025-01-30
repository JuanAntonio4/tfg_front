<template>
    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-clientes'}"></v-btn>
     <h3 style="text-align: center; margin: 10px;">Edita el cliente: {{ cliente.nombre }}</h3>
     
        <v-form v-model="valid" @submit.prevent="editarCliente" >
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
                <v-btn class="mt-2" type="submit" color="primary">Guardar Cambios</v-btn>
              </v-col>
           </v-row>  
           
           <v-dialog v-model="dialogoOk" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡Cliente Editado!</v-card-title>
                <v-card-text>El cliente/empresa se ha modificado correctamente</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="cerrarDialogoOK">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogoSinCambios" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡No has realizado ningún cambio!</v-card-title>
                <v-card-text>El cliente/empresa no se ha modificado correctamente ya que no has editado ningún campo</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="cerrarDialogoSinCambios">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
  
            
          </v-container>
        </v-form>
 
</template>

<script setup>

import { onMounted, ref} from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  // Datos reactivos
  const cliente = ref({
    nombre: "",
    direccion: "",
  });
  

  const router = useRouter();
  const route = useRoute();
  const dialogoOk = ref(false)
  const dialogoSinCambios = ref(false)

  onMounted(async()=>{
    const id = route.params.id
    const respuesta = await fetch(`/api/clientes/${id}`)
    cliente.value = await respuesta.json()
  })


  const editarCliente = async () => {
    const id = route.params.id
    try {
        const respuesta = await fetch(`/api/clientes/${id}/editar`, {
            method: 'PUT',
            body: JSON.stringify(cliente.value),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!respuesta.ok) {
            throw new Error("Error al crear el aviso");
        }
        const mensajeBack = await respuesta.text();
        if (mensajeBack == "No has realizado ningún cambio") {
            dialogoSinCambios.value= true
        }else {
            dialogoOk.value = true;
        }

        
    } catch (error) {
          console.error("Error:", error);
    }

  };

  const cerrarDialogoOK = () =>{
    dialogoOk.value = false;
    router.push('/lista-de-clientes')
  }

  const cerrarDialogoSinCambios = () =>{
    dialogoSinCambios.value = false;
  }



</script>