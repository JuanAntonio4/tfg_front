<template>
    <v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-obras'}"></v-btn>
    <h3 style="text-align: center; margin: 10px;">Editar la obra :  {{ obra.nombre }}</h3>
    
       <v-form v-model="valid" @submit.prevent="editarObra" >
         <v-container>
           <v-text-field 
             v-model="obra.nombre"
             :rules="reglaNoVacio"
             label="Introduce el nombre/identificador de la obra"
             required
             clearable
             variant="outlined"
             class="mb-4"
           ></v-text-field>
    
           <v-select
             v-model="obra.cliente"
             label="Selecciona un cliente"
             :items="clientes"
             item-title="nombre"
             item-value="id"
             :rules="reglaNoVacio"
             required
             clearable
             variant="outlined"       
             class="mb-4"    
           ></v-select>
    
           <v-text-field
             v-model="obra.fechaPrevistaFin"
             type="date"
             label="Selecciona una fecha de finalicación prevista"
             :rules="reglaNoVacio"
             required
             clearable
             variant="outlined"   
             class="mb-4"
           />
           
           <v-row justify="center">
             <v-col cols="auto">
              <v-btn class="mt-2" type="submit" color="primary">Guardar Cambios</v-btn>
             </v-col>
          </v-row>  
          
          <v-dialog v-model="dialogoOk" max-width="500px">
                <v-card>
                  <v-card-title class="text-h6">¡Obra Editada!</v-card-title>
                  <v-card-text>La obra se ha modificado correctamente.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="cerrarDialogoOK">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogoSinCambios" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">¡No has realizado ningún cambio!</v-card-title>
                <v-card-text>La obra no se ha modificado correctamente ya que no has editado ningún campo</v-card-text>
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
import { ref, onMounted} from "vue";
import { useRouter, useRoute } from "vue-router";


const clientes = ref([]);
const dialogoOk = ref(false);
const dialogoSinCambios = ref(false)
const route = useRoute();
const router = useRouter();


// Datos reactivos
const obra = ref({
  nombre: "",
  cliente:"",
  fechaPrevistaFin:"",

});

onMounted(async () =>{
    const respuesta = await fetch('/api/clientes')
    const data = await respuesta.json()
    clientes.value = data
})

onMounted(async () =>{
    const id = route.params.id

    const respuesta = await fetch(`/api/obras/${id}`)
    const data = await respuesta.json()
    obra.value = data
})

const editarObra = async () =>{
    const id = route.params.id
    const obraSimple = { ...obra.value, cliente: { id: obra.value.cliente.id ?? obra.value.cliente } };
    try {
        const respuesta = await fetch(`/api/obras/${id}/editar`,{
        method: 'PUT',
        body: JSON.stringify(obraSimple),
        headers: {
        "Content-Type": "application/json",
      },

    })

    if (!respuesta.ok) {
        throw new Error("Error al guardar el aviso");
    }
    const mensajeBack = await respuesta.text();
        if (mensajeBack == "No has realizado ningún cambio") {
            dialogoSinCambios.value= true
        }else {
            dialogoOk.value = true;
        }
    } catch (error) {

        console.error("Error al guardar el aviso:", e);
        
    }


};

const cerrarDialogoOK =  () =>{
  dialogoOk.value= false
  router.push('/lista-de-obras')
};

const cerrarDialogoSinCambios = () =>{
    dialogoSinCambios.value = false;
  }

</script>