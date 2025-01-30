<template>
<v-btn icon="mdi-arrow-left" size="small" style="margin-left: 20px;" :to="{name:'lista-de-obras'}"></v-btn>
<h3 style="text-align: center; margin: 10px;">Crea una obra</h3>

   <v-form v-model="valid" @submit.prevent="enviarFormulario" style="margin-bottom: 50px;">
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
           <v-btn class="mt-2" type="submit">Enviar</v-btn>
         </v-col>
      </v-row>  
      
      <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="text-h6">¡Obra Creada!</v-card-title>
              <v-card-text>La obra se ha creado correctamente.</v-card-text>
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
  import { ref, onMounted} from "vue";
  import { useRouter } from "vue-router";
  

  const clientes = ref([]);
  const dialog = ref(false);
  const router = useRouter();


  // Datos reactivos
  const obra = ref({
    nombre: "",
    cliente:"",
    fechaPrevistaFin:"",

});


onMounted(async () =>{
    const respuesta = await fetch ('http://localhost:8080/api/clientes')
    const data = await respuesta.json()
    clientes.value = data
})

const enviarFormulario =async ()=>{
    try {
        const obraSimple = { ...obra.value, cliente: { id: obra.value.cliente } };

        const respuesta = await fetch('http://localhost:8080/api/obras',{
            method: 'POST',
            body: JSON.stringify(obraSimple),
            headers: { 'Content-Type': 'application/json' }
        })
        if(!respuesta.ok){
            throw new Error("Error al crear la obra");
        }

        dialog.value = true;

    } catch (error) {
        console.error("Error:", error);
    }

}

const cerrarDialogo = () =>{
    dialog.value = false;
    router.push('/lista-de-obras')
};

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